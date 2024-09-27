import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'
import PasswordIcon from '@mui/icons-material/Password'
import GitHubIcon from '@mui/icons-material/GitHub'
import PersonIcon from '@mui/icons-material/Person'
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom'

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
  const { t } = useTranslation(['config', 'general'])

  const drawerWidth = 240

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
