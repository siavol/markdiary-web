import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  AppInstallationResult,
  useAppInstallation,
} from '../../hooks/useAppInstallation'
import { loadConfig, saveGitHubToken } from '../../services/config-storage'

type Disableable = {
  disabled?: boolean
}

type AppInstallationProps = {
  installationResult: AppInstallationResult
}

const apos = "'"
const space = ' '

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

const GitHubAppAuthConfig: React.FunctionComponent = () => {
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

type GitHubTokenProps = {
  token?: string | null
  onChange?: (value: string) => void
}

export const GitHubToken: React.FunctionComponent<GitHubTokenProps> = ({
  token,
  onChange,
}) => {
  const { t } = useTranslation(['config', 'general'])

  const [value, setValue] = useState(token)

  const handleValueChanged = (newValue: string): void => {
    setValue(newValue)
    onChange && onChange(newValue)
  }

  return (
    <>
      {/* Link to GitHub Token Creation */}
      <Box mt={2}>
        <Typography>
          You can create a token by visiting the{' '}
          <Link
            href="https://github.com/settings/tokens?type=beta"
            target="_blank"
            rel="noopener"
          >
            GitHub Token Creation Page
          </Link>
          . Make sure to copy the token and paste it below once it{apos}s
          created.
        </Typography>
      </Box>

      {/* Token Input */}
      <Box mt={2}>
        <TextField
          label={t('Enter Personal Access Token')}
          variant="outlined"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          value={value}
          onChange={(e) => handleValueChanged(e.target.value)}
        />
      </Box>
    </>
  )
}

const GitHubTokenConfig: React.FunctionComponent = () => {
  const config = loadConfig()
  const [token, setToken] = useState(config.github.auth.token)

  const saveToken = (): void => {
    saveGitHubToken({
      type: 'token',
      token,
    })
  }

  return (
    <Box>
      <Alert severity="info">
        The recommended way to authenticate is by using the{space}
        <strong>GitHub App authentication</strong>. This automates the token
        management process, including creating, refreshing, and limiting
        repository access.
      </Alert>
      <GitHubToken token={token} onChange={(value) => setToken(value)} />
      <Button variant="contained" onClick={saveToken}>
        Apply
      </Button>
    </Box>
  )
}

export const ConfigGitHubAuth: React.FunctionComponent = () => {
  const config = loadConfig()
  const [authType, setAuthType] = useState(config.github.auth.type)

  return (
    <Box>
      <ToggleButtonGroup
        exclusive
        value={authType}
        onChange={(_, value) => setAuthType(value)}
      >
        <ToggleButton value="app">GitHub App authentication</ToggleButton>
        <ToggleButton value="token">Token authentication</ToggleButton>
      </ToggleButtonGroup>

      <Box mt={2}>
        {authType === 'app' ? <GitHubAppAuthConfig /> : <GitHubTokenConfig />}
      </Box>
    </Box>
  )
}
