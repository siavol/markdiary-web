export type Config = {
  github: {
    owner: string | null
    repo: string | null
    auth: GitHubAuthConfig
  }
  committer: {
    author: string | null
    email: string | null
  }
}

type GitHubAuthType = 'token' | 'app'

export type GitHubAuthConfig = {
  type: GitHubAuthType
  token: string | null
  refreshToken: string | null
  refreshTokenExpiresIn: Date | null
}

const GithubOwnerStorageItem = 'markdiary.github.owner'
const GithubRepoStorageItem = 'markdiary.github.repo'
const GithubAuthTypeStorageItem = 'markdiary.github.auth.type'
const GithubAuthTokenStorageItem = 'markdiary.github.auth.token'
const GithubAuthRefreshTokenStorageItem = 'markdiary.github.auth.refresh-token'
const GithubAuthRefreshTokenExpirationStorageItem =
  'markdiary.github.auth.refresh-token-expiration'
const GithubAuthorStorageItem = 'markdiary.committer.author'
const GithubEmailStorageItem = 'markdiary.committer.email'

function setNullableStorageIten(
  key: string,
  value: string | null | undefined
): void {
  if (value) localStorage.setItem(key, value)
  else localStorage.removeItem(key)
}

export function saveGitHubToken(authConfig: GitHubAuthConfig): void {
  if (!authConfig.token) {
    throw new Error('GitHub token must be not empty.')
  }

  localStorage.setItem(GithubAuthTypeStorageItem, authConfig.type)
  localStorage.setItem(GithubAuthTokenStorageItem, authConfig.token)
  setNullableStorageIten(
    GithubAuthRefreshTokenStorageItem,
    authConfig.refreshToken
  )
  setNullableStorageIten(
    GithubAuthRefreshTokenExpirationStorageItem,
    authConfig.refreshTokenExpiresIn?.toISOString()
  )
}

export function saveConfig(config: Config): void {
  if (
    !config.github.owner ||
    !config.github.repo ||
    !config.github.auth.token ||
    !config.committer.author ||
    !config.committer.email
  ) {
    throw new Error('Incomplete config can not be saved.')
  }

  localStorage.setItem(GithubOwnerStorageItem, config.github.owner)
  localStorage.setItem(GithubRepoStorageItem, config.github.repo)

  saveGitHubToken(config.github.auth)

  localStorage.setItem(GithubAuthorStorageItem, config.committer.author)
  localStorage.setItem(GithubEmailStorageItem, config.committer.email)
}

function parseGithubAuthType(value: string | null): GitHubAuthType {
  switch (value) {
    case 'token':
    case 'app':
      return value
    default:
      return 'token'
  }
}

export function loadConfig(): Config {
  let token = localStorage.getItem(GithubAuthTokenStorageItem)
  if (!token) {
    // fallback to legacy config item
    // TODO: remove this config after migration
    token = localStorage.getItem('markdiary.github.token')
  }

  const refreshTokenExpirationSttr = localStorage.getItem(
    GithubAuthRefreshTokenExpirationStorageItem
  )
  const refreshTokenExpiresIn = refreshTokenExpirationSttr
    ? new Date(refreshTokenExpirationSttr)
    : null

  return {
    github: {
      owner: localStorage.getItem(GithubOwnerStorageItem),
      repo: localStorage.getItem(GithubRepoStorageItem),
      auth: {
        type: parseGithubAuthType(
          localStorage.getItem(GithubAuthTypeStorageItem)
        ),
        token,
        refreshToken: localStorage.getItem(GithubAuthRefreshTokenStorageItem),
        refreshTokenExpiresIn,
      },
    },
    committer: {
      author: localStorage.getItem(GithubAuthorStorageItem),
      email: localStorage.getItem(GithubEmailStorageItem),
    },
  }
}
