import React, { ChangeEvent, useEffect, useState } from 'react'
import { Config, loadConfig, saveConfig } from '../../services/config-storage'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Link,
  Typography,
} from '@mui/material'

const ConfigGithub: React.FunctionComponent = () => {
  const [config, setConfig] = useState<Config>({
    github: {
      owner: null,
      repo: null,
      token: null,
    },
    committer: {
      author: null,
      email: null,
    },
  })
  const { t } = useTranslation(['config', 'general'])

  useEffect(() => {
    const configFromStorage = loadConfig()
    setConfig(configFromStorage)
  }, [])

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

  const handleSave = (): void => {
    saveConfig(config)
  }

  const appName = process.env.REACT_APP_GITHUB_APP_NAME
  const gitHubAppInstallUrl = `https://github.com/apps/${appName}/installations/new/`

  return (
    <Container>
      <Typography variant="h3">
        {t('Configure Dairy GitHub Connection.')}
      </Typography>

      <Typography variant="h4">{t('1. Connect to GitHub')}</Typography>

      <Typography variant="h5">{t('With GitHub App')}</Typography>
      <Box>
        <Link href={gitHubAppInstallUrl}>Login with GitHub</Link>
      </Box>

      <Typography variant="h5">{t('OR with GitHub Token')}</Typography>
      <FormControl>
        <InputLabel htmlFor="token-input">{t('Token:')}</InputLabel>
        <Input
          type="password"
          id="token-input"
          name="token"
          aria-describedby="token-helper-text"
          value={config.github.token || ''}
          onChange={handleChange('github')}
        />
        <FormHelperText id="token-helper-text">
          {t('Your GitHub token with access to your dairy repository.')}
        </FormHelperText>
      </FormControl>

      <Typography variant="h4">{t('2. Select repository')}</Typography>
      <Box>
        <FormControl>
          <InputLabel htmlFor="owner-input">{t('Owner:')}</InputLabel>
          <Input
            type="text"
            id="owner-input"
            name="owner"
            aria-describedby="owner-helper-text"
            value={config.github.owner || ''}
            onChange={handleChange('github')}
          />
          <FormHelperText id="owner-helper-text">
            {t('The repository owner name')}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="repo-input">{t('Repository:')}</InputLabel>
          <Input
            type="text"
            id="repo-input"
            name="repo"
            aria-describedby="repo-helper-text"
            value={config.github.repo || ''}
            onChange={handleChange('github')}
          />
          <FormHelperText id="repo-helper-text">
            {t('The dairy repository name')}
          </FormHelperText>
        </FormControl>
      </Box>

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
