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
import {
  Outlet,
  useLoaderData,
  Link as RouterLink,
  useLocation,
} from 'react-router-dom'
import { ConfigGithubData } from './config-actions'
import { InstallGitHubApp, LoginToGitHubApp } from './github-auth'
import GithubRepoSelect, { RepoValue } from './github-repo'

const ConfigGithub: React.FunctionComponent = () => {
  const { repos } = useLoaderData() as ConfigGithubData
  const location = useLocation()
  const [config, setConfig] = useState<Config>(loadConfig())
  const { t } = useTranslation(['config', 'general'])

  const drawerWidth = 240

  const isLocation = (path: string): boolean => {
    return location.pathname.endsWith(`/${path}`)
  }

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
              <ListItemButton
                to="./auth"
                component={RouterLink}
                selected={isLocation('auth')}
              >
                <ListItemIcon>
                  <PasswordIcon />
                </ListItemIcon>
                <ListItemText>{t('Authentication')}</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem key="repo" disablePadding>
              <ListItemButton
                to="./repo"
                component={RouterLink}
                selected={isLocation('repo')}
              >
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <ListItemText>{t('Repository')}</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem key="author" disablePadding>
              <ListItemButton
                to="./author"
                component={RouterLink}
                selected={isLocation('author')}
              >
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
      </Box>
    </>
  )
}

export default ConfigGithub
