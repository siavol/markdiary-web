import { Buffer } from 'buffer'
import { Octokit } from '@octokit/rest'
import { Config, GitHubAuthConfig, saveGitHubToken } from './config-storage'
import { GitHubApiError } from '../errors/github-error'
import { AuthenticationError } from '../errors/authentication-error'

const JournalFolder = 'journal'

type DateParts = {
  fullYear: string
  month: string
  day: string
  time: string
}

export type RepositoryContentItem = {
  name: string
  path: string
  sha: string
  html_url: string | null
  type: 'dir' | 'file' | 'submodule' | 'symlink'
}

export type GitHubAppToken = {
  access_token: string
  expires_in: string
  refresh_token: string
  refresh_token_expires_in: string
  scope: string
  token_type: string
}

export type GitHubRepo = {
  owner: string
  name: string
  fullName: string
}

function dateParts(date: Date): DateParts {
  const fullYear = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const time = `${hours}${minutes}`

  return {
    fullYear: fullYear,
    month: month,
    day: day,
    time: time,
  }
}

function getDateInSecondsFromNow(value: string): Date {
  const gap = 300 // expire in 5 minutes earlier
  const seconds = parseInt(value)
  const currentDate = new Date()
  currentDate.setSeconds(currentDate.getSeconds() + seconds - gap)
  return currentDate
}

async function ensureResponseSuccessful(response: Response): Promise<void> {
  if (!response.ok) {
    const details = await response.json()
    const error = new GitHubApiError(
      `HTTP error! Status: ${response.status}, Details: ${JSON.stringify(details)}`,
      response.status
    )
    throw error
  }
}

function notEmpty(value: string | null): string {
  if (!value) {
    throw new Error('Value must be a non-empty string')
  }
  return value
}

export async function exchangeCodeToAccessToken(
  code: string
): Promise<GitHubAuthConfig> {
  const exchangeUrl = `${process.env.REACT_APP_GITHUB_APP_EXCHANGE_URL}&github-code=${code}`
  const response = await fetch(exchangeUrl, {
    method: 'POST',
    headers: {},
  })
  await ensureResponseSuccessful(response)

  const tokenData = await response.json()

  const tokenExpiresIn = getDateInSecondsFromNow(tokenData.expires_in)
  const refreshTokenExpiresIn = getDateInSecondsFromNow(
    tokenData.refresh_token_expires_in
  )

  return {
    type: 'app',
    token: tokenData.access_token,
    tokenExpiresIn,
    refreshToken: tokenData.refresh_token,
    refreshTokenExpiresIn,
  }
}

async function refreshToken(config: Config): Promise<GitHubAuthConfig> {
  if (config.github.auth.type !== 'app')
    throw new AuthenticationError(
      'Only GitHub App authentication supports token refresh'
    )
  const token = config.github.auth.refreshToken
  if (!token)
    throw new AuthenticationError(
      'There is no authentication refresh token in the storage'
    )

  const refreshUrl = `${process.env.REACT_APP_GITHUB_APP_REFRESH_URL}&refresh-token=${token}`
  const response = await fetch(refreshUrl, {
    method: 'POST',
    headers: {},
  })
  await ensureResponseSuccessful(response)

  const tokenData = await response.json()

  const tokenExpiresIn = getDateInSecondsFromNow(tokenData.expires_in)
  const refreshTokenExpiresIn = getDateInSecondsFromNow(
    tokenData.refresh_token_expires_in
  )

  return {
    type: 'app',
    token: tokenData.access_token,
    tokenExpiresIn,
    refreshToken: tokenData.refresh_token,
    refreshTokenExpiresIn,
  }
}

let refreshTokenPromise: Promise<string | null> | null = null

async function getAuthToken(config: Config): Promise<string | null> {
  const auth = config.github.auth

  if (!auth.token)
    throw new AuthenticationError(
      'There is no authentication token in the storage'
    )

  if (auth.type === 'token') {
    return auth.token
  }

  const now = new Date()
  if (auth.tokenExpiresIn && auth.tokenExpiresIn > now) {
    return auth.token
  }

  // ensure only one token refresh will be executed
  if (!refreshTokenPromise) {
    refreshTokenPromise = refreshToken(config)
      .then((tokenData) => {
        saveGitHubToken(tokenData)
        return tokenData.token
      })
      .finally(() => {
        // cleanup shared token in a minute
        setTimeout(() => {
          refreshTokenPromise = null
        }, 60 * 1000)
      })
  }

  return refreshTokenPromise
}

export async function writeFileContent(
  title: string,
  content: string,
  timestamp: Date,
  config: Config
): Promise<void> {
  const { owner, repo } = config.github
  const { author, email } = config.committer
  const token = await getAuthToken(config)

  const { fullYear, month, day, time } = dateParts(timestamp)

  const filePath = [
    JournalFolder,
    fullYear,
    month,
    `${fullYear}${month}${day}-${time}.md`,
  ].join('/')

  const markdown = `# ${title}\n${content}`

  const octokit = new Octokit({
    auth: token,
  })
  await octokit.repos.createOrUpdateFileContents({
    owner: notEmpty(owner),
    repo: notEmpty(repo),
    path: filePath,
    message: `${fullYear}${month}${day}-${time}`,
    committer: {
      name: notEmpty(author),
      email: notEmpty(email),
    },
    author: {
      name: notEmpty(author),
      email: notEmpty(email),
    },
    content: Buffer.from(markdown).toString('base64'),
  })
}

export async function getRepositoryContent(
  path: string,
  config: Config
): Promise<RepositoryContentItem[]> {
  const { owner, repo } = config.github
  const token = await getAuthToken(config)

  const octokit = new Octokit({
    auth: token,
  })

  const response = await octokit.repos.getContent({
    owner: notEmpty(owner),
    repo: notEmpty(repo),
    path,
    mediaType: { format: 'application/vnd.github.html+json' },
  })
  const data = response.data

  if (Array.isArray(data)) {
    return data.map((item) => ({
      name: item.name,
      path: item.path,
      sha: item.sha,
      html_url: item.html_url,
      type: item.type,
    }))
  } else {
    throw new Error('Not expected content response')
  }
}

export async function getRepositoryContentHtml(
  path: string,
  config: Config
): Promise<string> {
  const { owner, repo } = config.github
  const token = await getAuthToken(config)

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  const headers = {
    Accept: 'application/vnd.github.html+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${token}`,
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: headers,
  })
  await ensureResponseSuccessful(response)

  return await response.text()
}

export async function getRepos(config: Config): Promise<GitHubRepo[]> {
  const token = await getAuthToken(config)
  const octokit = new Octokit({
    auth: token,
  })
  const response = await octokit.rest.repos.listForAuthenticatedUser()

  const repos = response.data
  return repos.map((r) => ({
    owner: r.owner.login,
    name: r.name,
    fullName: r.full_name,
  }))
}
