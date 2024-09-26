import { useEffect, useState } from 'react'
import {
  ConfigStatus,
  hasConfigured,
  loadConfig,
} from '../services/config-storage'
import { getAppInstallations } from '../services/github'

export type AppInstallationResult = {
  appInstalled: boolean | null
  loading: boolean
  error: unknown
}

export function useAppInstallation(): AppInstallationResult {
  const [appInstalled, setAppInstalled] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>()

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      setLoading(true)
      try {
        const config = loadConfig()
        const installations = await getAppInstallations(config)
        const thisAppName = process.env.REACT_APP_GITHUB_APP_NAME
        const hasApp = installations.some((app) => app.appSlug === thisAppName)
        setAppInstalled(hasApp)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (hasConfigured(ConfigStatus.Auth)) {
      fetch()
    } else {
      setAppInstalled(false)
      setLoading(false)
    }
  }, [])

  return { appInstalled, loading, error }
}
