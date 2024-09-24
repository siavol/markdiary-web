import { useEffect, useState } from 'react'
import { loadConfig } from '../services/config-storage'
import { getAppInstallations } from '../services/github'

type AppInstallationResult = {
  appInstalled: boolean | null
  loading: boolean
  error: unknown
}

export function useAppInstallation(): AppInstallationResult {
  const config = loadConfig()
  const [appInstalled, setAppInstalled] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>()

  const thisAppName = process.env.REACT_APP_GITHUB_APP_NAME

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      setLoading(true)
      try {
        const installations = await getAppInstallations(config)
        const hasApp = installations.some((app) => app.appSlug === thisAppName)
        setAppInstalled(hasApp)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  })

  return { appInstalled, loading, error }
}
