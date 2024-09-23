import React, { ChangeEvent, ReactNode, useState } from 'react'
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

type ConfigSectionLinkProps = {
  path: string
  name: string
  icon: ReactNode
}
const ConfigSectionLink: React.FunctionComponent<ConfigSectionLinkProps> = ({
  path,
  name,
  icon,
}) => {
  const location = useLocation()

  return (
    <ListItem key={path} disablePadding>
      <ListItemButton
        to={`./${path}`}
        component={RouterLink}
        selected={location.pathname.endsWith(`/${path}`)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

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
            <ConfigSectionLink
              path="auth"
              name={t('Authentication')}
              icon={<PasswordIcon />}
            />
            <ConfigSectionLink
              path="repo"
              name={t('Repository')}
              icon={<GitHubIcon />}
            />
            <ConfigSectionLink
              path="author"
              name={t('Author')}
              icon={<PersonIcon />}
            />
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
