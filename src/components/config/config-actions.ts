import { ActionFunctionArgs } from 'react-router-dom'
import { exchangeCodeToAccessToken } from '../../services/github'
import { saveGitHubToken } from '../../services/config-storage'

function getDateInSecondsFromNow(seconds: number): Date {
  const currentDate = new Date()
  currentDate.setSeconds(currentDate.getSeconds() + seconds)
  return currentDate
}

export class GitHubAppAuthError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly description: string
  ) {
    super(message)

    this.name = this.constructor.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export type GithubAppStatus = 'app-installed'

export async function githubAppTokenLoader(
  args: ActionFunctionArgs
): Promise<GithubAppStatus> {
  const url = new URL(args.request.url)
  const params = new URLSearchParams(url.search)

  const error = params.get('error')
  if (error) {
    throw new GitHubAppAuthError(
      'Error in GitHub App callback',
      error,
      params.get('error_description') || ''
    )
  }

  const code = params.get('code')
  if (!code) {
    throw new GitHubAppAuthError(
      'No GitHub code in callback',
      'no_github_code',
      ''
    )
  }

  const tokenData = await exchangeCodeToAccessToken(code)

  const refreshTokenExpiresInSec = parseInt(tokenData.refresh_token_expires_in)
  const refreshTokenExpiresIn = getDateInSecondsFromNow(
    refreshTokenExpiresInSec
  )

  saveGitHubToken({
    type: 'app',
    token: tokenData.access_token,
    refreshToken: tokenData.refresh_token,
    refreshTokenExpiresIn,
  })

  return 'app-installed'
}
