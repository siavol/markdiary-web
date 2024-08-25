export type Config = {
  github: {
    owner: string | null
    repo: string | null
    token: string | null
  }
  committer: {
    author: string | null
    email: string | null
  }
}

export function saveConfig(config: Config): void {
  if (
    !config.github.owner ||
    !config.github.repo ||
    !config.github.token ||
    !config.committer.author ||
    !config.committer.email
  ) {
    throw new Error('Incomplete config can not be saved.')
  }

  localStorage.setItem('markdiary.github.owner', config.github.owner)
  localStorage.setItem('markdiary.github.repo', config.github.repo)
  localStorage.setItem('markdiary.github.token', config.github.token)

  localStorage.setItem('markdiary.committer.author', config.committer.author)
  localStorage.setItem('markdiary.committer.email', config.committer.email)
}

export function saveGitHubToken(token: string): void {
  if (!token) {
    throw new Error('GitHub token must be not empty.')
  }

  localStorage.setItem('markdiary.github.token', token)
}

export function loadConfig(): Config {
  return {
    github: {
      owner: localStorage.getItem('markdiary.github.owner'),
      repo: localStorage.getItem('markdiary.github.repo'),
      token: localStorage.getItem('markdiary.github.token'),
    },
    committer: {
      author: localStorage.getItem('markdiary.committer.author'),
      email: localStorage.getItem('markdiary.committer.email'),
    },
  }
}
