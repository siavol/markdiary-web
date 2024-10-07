import React from 'react'
import {
  Link as RouterLink,
  Outlet,
  useNavigation,
  useMatches,
} from 'react-router-dom'
import Box from '@mui/material/Box'
import {
  AppBar,
  Container,
  Typography,
  Toolbar,
  IconButton,
  LinearProgress,
  CssBaseline,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SourceCodeLink from './toolbar/source-code-link'
import UserMenu from './toolbar/user-menu'
import NewRecordButton from './toolbar/new-record-button'

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

          <NewRecordButton />

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
