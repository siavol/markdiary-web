import { ActionFunctionArgs } from 'react-router-dom'
import {
  exchangeCodeToAccessToken,
  getRepos,
  GitHubRepo,
} from '../../services/github'
import {
  hasRequiredConfiguration,
  loadConfig,
  saveGitHubToken,
} from '../../services/config-storage'
import { GitHubAppAuthFlowError } from '../../errors/github-app-auth-flow-error'

export type GithubAppStatus = 'app-installed'

export type ConfigGithubData = {
  repos: GitHubRepo[]
}

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

export async function configGithubLoader(): Promise<ConfigGithubData> {
  if (!hasRequiredConfiguration()) {
    return {
      repos: [],
    }
  }

  try {
    const config = loadConfig()
    const repos = await getRepos(config)
    return { repos }
  } catch (err) {
    console.log('Failed to load repositories list.', err)
    return {
      repos: [],
    }
  }
}
