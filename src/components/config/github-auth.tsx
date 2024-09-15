import { Button } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const InstallGitHubApp: React.FunctionComponent = () => {
  const { t } = useTranslation(['config', 'general'])

  const appName = process.env.REACT_APP_GITHUB_APP_NAME
  const gitHubAppInstallUrl = `https://github.com/apps/${appName}/installations/new/`

  return (
    <Button
      variant="contained"
      color="primary"
      href={gitHubAppInstallUrl}
      sx={{ mr: 2 }}
    >
      {t('Install App')}
    </Button>
  )
}

export const LoginToGitHubApp: React.FunctionComponent = () => {
  const { t } = useTranslation(['config', 'general'])

  const clientId = process.env.REACT_APP_GITHUB_APP_CLIENT_ID
  const gitHubAppLoginUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`

  return (
    <Button variant="outlined" color="secondary" href={gitHubAppLoginUrl}>
      {t('Login to App')}
    </Button>
  )
}
