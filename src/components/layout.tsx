import React from 'react'
import { Link as RouterLink, Outlet, useNavigation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import {
  AppBar,
  Container,
  Typography,
  Button,
  Toolbar,
  IconButton,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

const Layout: React.FunctionComponent = () => {
  const navigation = useNavigation()
  const { t } = useTranslation(['layout', 'general'])

  if (navigation.state === 'idle') {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              to="/"
              component={RouterLink}
              variant="h6"
              color="inherit"
              sx={{ flexGrow: 1, textDecoration: 'none' }}
            >
              Markdairy
            </Typography>

            <Button
              to="/new"
              color="inherit"
              component={RouterLink}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              {t('New record')}
            </Button>

            <Button
              to="/config"
              color="inherit"
              component={RouterLink}
              area-label="Configuration"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              {t('Configuration')}
            </Button>
            <IconButton
              to="/config"
              component={RouterLink}
              color="inherit"
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Box>
    )
  } else {
    return (
      <Box>
        <p>{t('loading...', { ns: 'general' })}</p>
      </Box>
    )
  }
}

export default Layout
