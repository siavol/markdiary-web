import React, { ChangeEvent, useState } from 'react'
import { Config, loadConfig, saveConfig } from '../../services/config-storage'
import { useTranslation } from 'react-i18next'
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { useLoaderData } from 'react-router-dom'
import { ConfigGithubData } from './config-actions'

const ConfigGithub: React.FunctionComponent = () => {
  const { repos } = useLoaderData() as ConfigGithubData
  const [config, setConfig] = useState<Config>(loadConfig())
  const { t } = useTranslation(['config', 'general'])

  const handleChange =
    (section: keyof Config) => (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setConfig((prevConfig) => ({
        ...prevConfig,
        [section]: {
          ...prevConfig[section],
          [name]: value,
        },
      }))
    }

  const handleAuthTokenChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setConfig((prevConfig) => ({
      ...prevConfig,
      github: {
        ...prevConfig.github,
        auth: {
          type: 'token',
          token: value,
        },
      },
    }))
  }

  const handleRepoNameChange = (value: string | null): void => {
    const [owner, repo] = (value || '').split('/', 2)
    setConfig((prevConfig) => ({
      ...prevConfig,
      github: {
        ...prevConfig.github,
        owner,
        repo,
      },
    }))
  }

  const handleSave = (): void => {
    saveConfig(config)
  }

  const appName = process.env.REACT_APP_GITHUB_APP_NAME
  const clientId = process.env.REACT_APP_GITHUB_APP_CLIENT_ID
  const gitHubAppInstallUrl = `https://github.com/apps/${appName}/installations/new/`
  const gitHubAppLoginUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`

  return (
    <Container>
      <Typography variant="h3">
        {t('Configure Dairy GitHub Connection.')}
      </Typography>

      <Typography variant="h4">{t('1. Connect to GitHub')}</Typography>

      <Typography variant="h5">{t('With GitHub App')}</Typography>
      <Box>
        <Link href={gitHubAppInstallUrl}>
          {t('Install Markdairy GitHub App')}
        </Link>
        <Typography variant="body1" display="inline">
          {t(' or ')}
        </Typography>
        <Link href={gitHubAppLoginUrl}>
          {t('Login to Markdairy GitHub App')}
        </Link>
      </Box>

      <Typography variant="h5">{t('OR with GitHub Token')}</Typography>
      <FormControl>
        <InputLabel htmlFor="token-input">{t('Token:')}</InputLabel>
        <Input
          type="password"
          id="token-input"
          name="token"
          aria-describedby="token-helper-text"
          value={config.github.auth.token || ''}
          onChange={handleAuthTokenChange}
        />
        <FormHelperText id="token-helper-text">
          {t('Your GitHub token with access to your dairy repository.')}
        </FormHelperText>
      </FormControl>

      <Typography variant="h4">{t('2. Select repository')}</Typography>
      <Autocomplete
        id="repo-name-input"
        aria-describedby="repo-name-helper-input"
        value={
          config.github.owner && config.github.repo
            ? `${config.github.owner}/${config.github.repo}`
            : ''
        }
        onChange={(_event, newInputValue) => {
          handleRepoNameChange(newInputValue)
        }}
        disablePortal
        options={repos.map((r) => r.fullName)}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Dairy repository" />
        )}
      />

      <Typography variant="h4">{t('3. Name yourself for git')}</Typography>
      <Box>
        <Typography variant="h5">{t('Committer')}</Typography>
        <FormControl>
          <InputLabel htmlFor="author-input">{t('Name:')}</InputLabel>
          <Input
            type="text"
            id="author-input"
            name="author"
            aria-describedby="author-helper-text"
            value={config.committer.author || ''}
            onChange={handleChange('committer')}
          />
          <FormHelperText id="author-helper-text">
            {t('Your name for the git commit')}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="email-input">{t('Email:')}</InputLabel>
          <Input
            type="text"
            id="email-input"
            name="email"
            aria-describedby="email-helper-text"
            value={config.committer.email || ''}
            onChange={handleChange('committer')}
          />
          <FormHelperText id="email-helper-text">
            {t('Your email for the git commit')}
          </FormHelperText>
        </FormControl>
      </Box>

      <Button onClick={handleSave}>{t('Save', { ns: 'general' })}</Button>
    </Container>
  )
}

export default ConfigGithub
