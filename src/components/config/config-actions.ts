import { ActionFunctionArgs } from 'react-router-dom'
import { exchangeCodeToAccessToken } from '../../services/github'
import { saveGitHubToken } from '../../services/config-storage'
import { GitHubAppAuthFlowError } from '../../errors/github-app-auth-flow-error'

export type GithubAppStatus = 'app-installed'

export async function githubAppTokenLoader(
  args: ActionFunctionArgs
): Promise<GithubAppStatus> {
  const url = new URL(args.request.url)
  const params = new URLSearchParams(url.search)

  const error = params.get('error')
  if (error) {
    throw new GitHubAppAuthFlowError(
      'Error in GitHub App callback',
      error,
      params.get('error_description') || ''
    )
  }

  const code = params.get('code')
  if (!code) {
    throw new GitHubAppAuthFlowError(
      'No GitHub code in callback',
      'no_github_code',
      ''
    )
  }

  const tokenData = await exchangeCodeToAccessToken(code)

  saveGitHubToken(tokenData)

  return 'app-installed'
}
