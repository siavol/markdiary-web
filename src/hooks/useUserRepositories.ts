import { useEffect, useState } from 'react'
import { getRepos, GitHubRepo } from '../services/github'
import {
  ConfigStatus,
  hasConfigured,
  loadConfig,
} from '../services/config-storage'

export type UserRepositoriesResult = {
  repos: GitHubRepo[] | null
  loading: boolean
  error: unknown
}

export default function useUserRepositories(): UserRepositoriesResult {
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>()

  useEffect(() => {
    if (hasConfigured(ConfigStatus.Auth)) {
      const config = loadConfig()
      getRepos(config)
        .then((data) => {
          setRepos(data)
        })
        .catch((err) => {
          setError(err)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setError(new Error('Authentication is not configured'))
      setLoading(false)
    }
  }, [])

  return { repos, loading, error }
}
