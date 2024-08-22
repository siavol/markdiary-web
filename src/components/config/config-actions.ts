import { ActionFunctionArgs } from 'react-router-dom'
import { exchangeCodeToAccessToken } from '../../services/github'

export type GitHubAppAuth = GitHubAppAuthToken | GitHubAppAuthError
export type GitHubAppAuthToken = {
  token: string
}
export type GitHubAppAuthError = {
  error: {
    code: string
    description: string
  }
}

export async function githubAppTokenLoader(
  args: ActionFunctionArgs
): Promise<GitHubAppAuth> {
  const url = new URL(args.request.url)
  const params = new URLSearchParams(url.search)

  const error = params.get('error')
  if (error) {
    return {
      error: {
        code: error,
        description: params.get('error_description') || '',
      },
    }
  }

  const code = params.get('code')
  if (!code) {
    return {
      error: {
        code: 'no_github_code',
        description: 'No GitHub code in callback.',
      },
    }
  }

  const tokenData = await exchangeCodeToAccessToken(code)
  return {
    token: tokenData.access_token,
  }
}
