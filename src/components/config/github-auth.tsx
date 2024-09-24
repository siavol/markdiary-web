import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppInstallation } from '../../hooks/useAppInstallation'

type Disableable = {
  disabled?: boolean
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

export const ConfigGitHubAuth: React.FunctionComponent = () => {
  // const { t } = useTranslation(['config', 'general'])
  const { appInstalled } = useAppInstallation()

  return (
    <Box>
      <Stack direction={'row'}>
        <InstallGitHubApp disabled={!!appInstalled} />
        <Typography alignContent={'center'}>
          You have application installed
        </Typography>
      </Stack>
      <Box mt={2}>
        <LoginToGitHubApp />
      </Box>
    </Box>
  )
}
