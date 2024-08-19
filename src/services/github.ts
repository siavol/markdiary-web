import { Buffer } from 'buffer'
import { Config } from './config-storage'
import { GitHubApiError } from './github-error'

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
  html_url: string
  type: 'dir' | 'file'
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

export async function writeFileContent(
  title: string,
  content: string,
  timestamp: Date,
  config: Config
): Promise<void> {
  const { owner, repo, token } = config.github
  const { author, email } = config.committer

  const { fullYear, month, day, time } = dateParts(timestamp)

  const folder = 'journal'
  const filePath = [
    fullYear,
    month,
    `${fullYear}${month}${day}-${time}.md`,
  ].join('/')

  const markdown = `# ${title}\n${content}`

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}/${filePath}`
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({
    message: `${fullYear}${month}${day}-${time}`,
    committer: {
      name: author,
      email: email,
    },
    content: Buffer.from(markdown).toString('base64'),
  })

  const response = await fetch(url, {
    method: 'PUT',
    headers: headers,
    body: body,
  })
  await ensureResponseSuccessful(response)

  await response.json()
}

export async function getRepositoryContent(
  path: string,
  config: Config
): Promise<RepositoryContentItem[]> {
  const { owner, repo, token } = config.github

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

  return await response.json()
}

export async function getRepositoryContentHtml(
  path: string,
  config: Config
): Promise<string> {
  const { owner, repo, token } = config.github

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

export async function exchangeCodeToAccessToken(code: string): Promise<string> {
  const clientId = process.env.REACT_APP_GITHUB_APP_CLIENT_ID
  const clientSecret = process.env.REACT_APP_GITHUB_APP_CLIENT_SECRET
  const url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`
  const response = await fetch(url, {
    method: 'POST',
  })
  await ensureResponseSuccessful(response)

  return await response.text()
}
