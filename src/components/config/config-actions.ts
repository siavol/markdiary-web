import { ActionFunctionArgs, redirect } from 'react-router-dom'
import {
  exchangeCodeToAccessToken,
  getRepos,
  GitHubRepo,
} from '../../services/github'
import {
  ConfigStatus,
  getConfigStatus,
  hasConfigured,
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
): Promise<Response | GithubAppStatus> {
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

  const configStatus = getConfigStatus()
  if (configStatus === ConfigStatus.Full) {
    return redirect('/config')
  } else {
    return redirect('/config-guide')
  }
}

export async function configGithubLoader(): Promise<ConfigGithubData> {
  if (!hasConfigured(ConfigStatus.Auth)) {
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
