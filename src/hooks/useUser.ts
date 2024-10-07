import { useEffect, useState } from 'react'
import { getUser, GitHubUser } from '../services/github'
import {
  ConfigStatus,
  hasConfigured,
  loadConfig,
} from '../services/config-storage'

type UserResults = {
  user: GitHubUser | null
  loading: boolean
  authConfigured: boolean
  error: unknown
}

export default function useUser(): UserResults {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [authConfigured, setAuthConfigured] = useState(false)
  const [error, setError] = useState<unknown>()

  useEffect(() => {
    if (hasConfigured(ConfigStatus.Auth)) {
      setAuthConfigured(true)
      const config = loadConfig()
      getUser(config)
        .then((data) => {
          setUser(data)
        })
        .catch((err) => {
          setError(err)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setAuthConfigured(false)
      setLoading(false)
    }
  }, [])

  return { user, loading, authConfigured, error }
}
