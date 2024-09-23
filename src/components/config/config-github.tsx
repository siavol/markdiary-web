import React, { ChangeEvent, useState } from 'react'
import { Config, loadConfig, saveConfig } from '../../services/config-storage'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  Container,
  Drawer,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import PasswordIcon from '@mui/icons-material/Password'
import GitHubIcon from '@mui/icons-material/GitHub'
import PersonIcon from '@mui/icons-material/Person'
import { Outlet, useLoaderData, Link as RouterLink } from 'react-router-dom'
import { ConfigGithubData } from './config-actions'
import { InstallGitHubApp, LoginToGitHubApp } from './github-auth'
import GithubRepoSelect, { RepoValue } from './github-repo'

const ConfigGithub: React.FunctionComponent = () => {
  const { repos } = useLoaderData() as ConfigGithubData
  const [config, setConfig] = useState<Config>(loadConfig())
  const { t } = useTranslation(['config', 'general'])

  const drawerWidth = 240

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

  const handleRepoNameChange = (value: RepoValue): void => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      github: {
        ...prevConfig.github,
        owner: value.owner,
        repo: value.repo,
      },
    }))
  }

  const handleSave = (): void => {
    saveConfig(config)
  }

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem key="auth" disablePadding>
              <ListItemButton to="./auth" component={RouterLink}>
                <ListItemIcon>
                  <PasswordIcon />
                </ListItemIcon>
                <ListItemText>{t('Authentication')}</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem key="repo" disablePadding>
              <ListItemButton to="./repo" component={RouterLink}>
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <ListItemText>{t('Repository')}</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem key="author" disablePadding>
              <ListItemButton to="./author" component={RouterLink}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText>{t('Author')}</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3, paddingLeft: `${drawerWidth}px` }}>
        <Toolbar />
        <Outlet></Outlet>

        {/* <Typography variant="h3">
          {t('Configure Dairy GitHub Connection.')}
        </Typography> */}

        {/* <Typography variant="h4">{t('1. Connect to GitHub')}</Typography> */}

        {/* <Typography variant="h5">{t('With GitHub App')}</Typography>
        <Box>
          <InstallGitHubApp />
          <Typography variant="body1" display="inline">
            {t(' or ')}
          </Typography>
          <LoginToGitHubApp />
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
        <GithubRepoSelect
          repos={repos}
          value={config.github}
          onChange={handleRepoNameChange}
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

        <Button onClick={handleSave}>{t('Save', { ns: 'general' })}</Button> */}
      </Box>
    </>
  )
}

export default ConfigGithub
