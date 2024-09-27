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
import {
  Outlet,
  Link as RouterLink,
  useLocation,
  useOutletContext,
} from 'react-router-dom'
import { LayoutContext } from '../layout'

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
  const { onMenuClick } = useOutletContext<LayoutContext>()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

  const handleDrawerClose = (): void => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = (): void => {
    setIsClosing(false)
  }

  const handleDrawerToggle = (): void => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  onMenuClick(handleDrawerToggle)

  const drawerWidth = 240

  const drawer = (
    <>
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
    </>
  )

  return (
    <>
      <Drawer
        // container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: 'none', sm: 'block' },
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 0, sm: 3 },
          pl: { xs: 0, sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <Outlet></Outlet>
      </Box>
    </>
  )
}

export default ConfigGithub
