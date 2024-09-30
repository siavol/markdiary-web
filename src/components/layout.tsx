import React from 'react'
import {
  Link as RouterLink,
  Outlet,
  useNavigation,
  useMatches,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import {
  AppBar,
  Container,
  Typography,
  Button,
  Toolbar,
  IconButton,
  LinearProgress,
  CssBaseline,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu'
import { ConfigStatus, hasConfigured } from '../services/config-storage'
import SourceCodeLink from './source-code-link'
import UserMenu from './user-menu'

type MenuClickHandler = () => void
export interface LayoutContext {
  onMenuClick(handler: MenuClickHandler): void
}

class LayoutContextImpl implements LayoutContext {
  private handlers: MenuClickHandler[] = []

  constructor() {
    this.onMenuClick = this.onMenuClick.bind(this)
    this.triggerMenuClick = this.triggerMenuClick.bind(this)
  }

  onMenuClick(handler: MenuClickHandler): void {
    this.handlers.push(handler)
  }

  triggerMenuClick(): void {
    for (const handler of this.handlers) {
      handler()
    }
  }
}

const Layout: React.FunctionComponent = () => {
  const navigation = useNavigation()
  const matches = useMatches()
  const { t } = useTranslation(['layout', 'general'])
  const isConfigured = hasConfigured(ConfigStatus.Full)

  const contex = new LayoutContextImpl()
  const showMenuButton = matches.some(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (match) => (match.handle as any)?.useMenuButton
  )
  const menuButton = showMenuButton ? (
    <IconButton
      color="inherit"
      edge="start"
      onClick={contex.triggerMenuClick}
      sx={{ mr: 2, display: { sm: 'none' } }}
    >
      <MenuIcon />
    </IconButton>
  ) : null

  const content =
    navigation.state === 'idle' ? (
      <Container maxWidth="md">
        <Outlet context={contex} />
      </Container>
    ) : (
      <LinearProgress />
    )

  const newButton = isConfigured ? (
    <Button
      to="/new"
      color="inherit"
      component={RouterLink}
      sx={{ display: { xs: 'none', sm: 'block' } }}
    >
      {t('New record')}
    </Button>
  ) : null

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {menuButton}

          <Typography
            to="/"
            component={RouterLink}
            variant="h6"
            color="inherit"
            sx={{ flexGrow: 1, textDecoration: 'none' }}
          >
            Markdiary
          </Typography>

          {newButton}

          <Button
            to="/config"
            color="inherit"
            component={RouterLink}
            area-label="Configuration"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            {t('Configuration')}
          </Button>
          <IconButton
            to="/config"
            component={RouterLink}
            color="inherit"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <SettingsIcon />
          </IconButton>

          <SourceCodeLink />

          <UserMenu />
        </Toolbar>
      </AppBar>

      {/* make a toolbar-size shift */}
      <Toolbar />

      {content}
    </Box>
  )
}

export default Layout
