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
  LinearProgress,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { hasRequiredConfiguration } from '../services/config-storage'

const Layout: React.FunctionComponent = () => {
  const navigation = useNavigation()
  const { t } = useTranslation(['layout', 'general'])
  const isConfigured = hasRequiredConfiguration()

  const content = navigation.state === 'idle' ? <Outlet /> : <LinearProgress />

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

          {newButton}

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

      <Container maxWidth="md">{content}</Container>
    </Box>
  )
}

export default Layout
