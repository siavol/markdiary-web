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
import { ConfigStatus, getConfigStatus } from '../../services/config-storage'

type ConfigSteps =
  | 'create-repo'
  | 'auth-github-app'
  | 'manual-auth-token'
  | 'select-repo'

function GetStepForConfigStatus(): ConfigSteps {
  const status = getConfigStatus()

  if (!(status & ConfigStatus.Auth)) return 'create-repo'
  if (!(status & ConfigStatus.Repo)) return 'select-repo'

  return 'select-repo'
}

const apos = "'"
const space = ' '

const ConfigGuide: React.FunctionComponent = () => {
  const getStepNo = (name: ConfigSteps): number => {
    switch (name) {
      case 'create-repo':
        return 0
      case 'auth-github-app':
        return 1
      case 'manual-auth-token':
        return 2
      case 'select-repo':
        return 3
      default:
        return 0
    }
  }

  const { t } = useTranslation(['config', 'guide'])
  const [activeStep, setActiveStep] = React.useState(
    getStepNo(GetStepForConfigStatus())
  )

  const gotoStep = (step: ConfigSteps): void => {
    setActiveStep(getStepNo(step))
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
              privacy, we recommend creating a{space}
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
        <Step key="auth-github">
          <StepLabel>
            {t('Authenticate via Markdairy GitHub App (Recommended)')}
          </StepLabel>
          <StepContent>
            <Typography>
              The recommended way to authenticate is by using the{space}
              <strong>Markdairy GitHub App</strong>. This automates the token
              management process, including creating, refreshing, and limiting
              repository access.
              <br />
              If you haven{apos}t installed the app yet, click{space}
              <strong>{t('Install App')}</strong>.
              <br />
              If you{apos}ve already installed the app, click{space}
              <strong>{t('Login to App')}</strong> to continue.
            </Typography>
            <Box mt={2}>
              <InstallGitHubApp />
              <LoginToGitHubApp />
            </Box>

            <Box mt={2}>
              <Typography>
                If you prefer to manually configure the token, you can{space}
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
              generating the token, make sure you enable <code>Contents</code>
              {space}
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
                Prefer an easier way? You can go back and{space}
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
        <Step key="select-repo">
          <StepLabel>{t('Select repostiory')}</StepLabel>
        </Step>
        <Step key="configure-author">
          <StepLabel>{t('Setup your name')}</StepLabel>
        </Step>
      </Stepper>
    </Container>
  )
}

export default ConfigGuide
