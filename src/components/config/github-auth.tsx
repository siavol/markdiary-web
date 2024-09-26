import { Alert, Box, Button, CircularProgress, Stack } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  AppInstallationResult,
  useAppInstallation,
} from '../../hooks/useAppInstallation'

type Disableable = {
  disabled?: boolean
}

type AppInstallationProps = {
  installationResult: AppInstallationResult
}

export const InstallGitHubApp: React.FunctionComponent<Disableable> = ({
  disabled,
}) => {
  const { t } = useTranslation(['config', 'general'])

  const appName = process.env.REACT_APP_GITHUB_APP_NAME
  const gitHubAppInstallUrl = `https://github.com/apps/${appName}/installations/new/`

  return (
    <Button
      variant="contained"
      color="primary"
      href={gitHubAppInstallUrl}
      disabled={disabled}
      sx={{ mr: 2 }}
    >
      {t('Install App')}
    </Button>
  )
}

export const LoginToGitHubApp: React.FunctionComponent<Disableable> = ({
  disabled,
}) => {
  const { t } = useTranslation(['config', 'general'])

  const clientId = process.env.REACT_APP_GITHUB_APP_CLIENT_ID
  const gitHubAppLoginUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`

  return (
    <Button
      variant="outlined"
      color="secondary"
      href={gitHubAppLoginUrl}
      disabled={disabled}
    >
      {t('Login to App')}
    </Button>
  )
}

const GitHubAppInstallationStatus: React.FunctionComponent<
  AppInstallationProps
> = ({ installationResult }) => {
  const { t } = useTranslation(['config', 'general'])

  if (installationResult.loading) {
    return <CircularProgress />
  }
  if (installationResult.error) {
    return (
      <Alert severity="warning">
        {t('Failed to check installation status.')}
      </Alert>
    )
  }
  if (installationResult.appInstalled) {
    return (
      <Alert severity="success">{t('You have application installed')}</Alert>
    )
  } else {
    return null
  }
}

export const ConfigGitHubAuth: React.FunctionComponent = () => {
  // const { t } = useTranslation(['config', 'general'])
  const installationResult = useAppInstallation()

  return (
    <Box>
      <Stack direction={'row'}>
        <InstallGitHubApp disabled={!!installationResult.appInstalled} />
        <GitHubAppInstallationStatus installationResult={installationResult} />
      </Stack>
      <Box mt={2}>
        <LoginToGitHubApp />
      </Box>
    </Box>
  )
}
