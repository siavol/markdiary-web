import React from 'react'
import { Link as RouterLink, Outlet, useNavigation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { AppBar, Container, Typography, Button, Toolbar } from '@mui/material'

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

            <Button to="/new" color="inherit" component={RouterLink}>
              {t('New record')}
            </Button>
            <Button to="/config" color="inherit" component={RouterLink}>
              {t('Configuration')}
            </Button>
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
