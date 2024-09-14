import React from 'react'
import {
  Box,
  Button,
  Container,
  Link,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { InstallGitHubApp, LoginToGitHubApp } from './github-auth'

const ConfigGuide: React.FunctionComponent = () => {
  const { t } = useTranslation(['config', 'guide'])
  const [activeStep, setActiveStep] = React.useState(0)

  const apos = "'"

  const gotoStep = (
    name: 'create-repo' | 'auth-github-app' | 'manual-auth-token'
  ): void => {
    switch (name) {
      case 'create-repo':
        setActiveStep(0)
        return
      case 'auth-github-app':
        setActiveStep(1)
        return
      case 'manual-auth-token':
        setActiveStep(2)
        return
    }
  }

  return (
    <Container>
      <Stepper orientation="vertical" activeStep={activeStep}>
        <Step key="create-repo">
          <StepLabel>{t('Create GitHub repository')}</StepLabel>
          <StepContent>
            <Typography>
              Before you begin journaling, you{apos}ll need to create a GitHub
              repository where your diary entries will be securely stored. For
              privacy, we recommend creating a{' '}
              <strong>private repository</strong> unless you want to make your
              diary publicly accessible. Create repository then continue.
            </Typography>
            <Link href="https://github.com/new" target="_blank">
              {t('Create a new repository')}
            </Link>
            <Box>
              <Button
                variant="contained"
                sx={{ mt: 1, mr: 1 }}
                onClick={() => gotoStep('auth-github-app')}
              >
                {t('Continue')}
              </Button>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel key="auth-github">
            {t('Authenticate via Markdairy GitHub App (Recommended)')}
          </StepLabel>
          <StepContent>
            <Typography>
              The recommended way to authenticate is by using the{' '}
              <strong>Markdairy GitHub App</strong>. This automates the token
              management process, including creating, refreshing, and limiting
              repository access.
              <br />
              If you haven{apos}t installed the app yet, click{' '}
              <strong>{t('Install App')}</strong>.
              <br />
              If you{apos}ve already installed the app, click{' '}
              <strong>{t('Login to App')}</strong> to continue.
            </Typography>
            <Box mt={2}>
              <InstallGitHubApp />
              <LoginToGitHubApp />
            </Box>

            <Box mt={2}>
              <Typography>
                If you prefer to manually configure the token, you can{' '}
                <Button
                  variant="text"
                  onClick={() => gotoStep('manual-auth-token')}
                >
                  {t('skip to manual authentication')}
                </Button>
                .
              </Typography>
            </Box>
          </StepContent>
        </Step>
        <Step key="manual-auth-token">
          <StepLabel>
            {t('Manually Create and Set an Authentication Token')}
          </StepLabel>
          <StepContent>
            <Typography>
              If you prefer not to use the GitHub App, you can manually create a
              personal access token with the required permissions. When
              generating the token, make sure you enable <code>Contents</code>{' '}
              repository permissions and set it to <strong>write access</strong>
              .
            </Typography>

            {/* Link to GitHub Token Creation */}
            <Box mt={2}>
              <Typography>
                You can create a token by visiting the{' '}
                <Link
                  href="https://github.com/settings/tokens?type=beta"
                  target="_blank"
                  rel="noopener"
                >
                  GitHub Token Creation Page
                </Link>
                . Make sure to copy the token and paste it below once it{apos}s
                created.
              </Typography>
            </Box>

            {/* Token Input */}
            <Box mt={2}>
              <TextField
                label={t('Enter Personal Access Token')}
                variant="outlined"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
              />
            </Box>

            {/* Continue Button */}
            <Box>
              <Button variant="contained" sx={{ mt: 1 }}>
                {t('Continue')}
              </Button>
            </Box>

            {/* Go Back to App Authentication */}
            <Box mt={2}>
              <Typography>
                Prefer an easier way? You can go back and{' '}
                <strong>install the Markdairy GitHub App</strong> instead.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 1 }}
                onClick={() => gotoStep('auth-github-app')} // Implement this handler to go back to the previous step
              >
                {t('Go Back to App Authentication')}
              </Button>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel key="select-repo">{t('Select repostiory')}</StepLabel>
        </Step>
        <Step>
          <StepLabel key="configure-author">{t('Setup your name')}</StepLabel>
        </Step>
      </Stepper>
    </Container>
  )
}

export default ConfigGuide
