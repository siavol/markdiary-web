import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  Link,
  StepContent,
  StepLabel,
  TextField,
  Typography,
} from '@mui/material'
import { InstallGitHubApp, LoginToGitHubApp } from './github-auth'

type OnContinueProps = {
  onContinue: () => void
}

type OnSkipProps = {
  onSkip: () => void
}

type OnGoBackProps = {
  onGoBack: () => void
}

const apos = "'"
const space = ' '

export const CreateRepoStep: React.FunctionComponent<OnContinueProps> = ({
  onContinue,
}) => {
  const { t } = useTranslation(['config', 'guide'])

  return (
    <>
      <StepLabel>{t('Create GitHub repository')}</StepLabel>
      <StepContent>
        <Typography>
          Before you begin journaling, you{apos}ll need to create a GitHub
          repository where your diary entries will be securely stored. For
          privacy, we recommend creating a{space}
          <strong>private repository</strong> unless you want to make your diary
          publicly accessible. Create repository then continue.
        </Typography>
        <Link href="https://github.com/new" target="_blank">
          {t('Create a new repository')}
        </Link>
        <Box>
          <Button
            variant="contained"
            sx={{ mt: 1, mr: 1 }}
            onClick={onContinue}
          >
            {t('Continue')}
          </Button>
        </Box>
      </StepContent>
    </>
  )
}

export const AuthGithubAppStep: React.FunctionComponent<OnSkipProps> = ({
  onSkip,
}) => {
  const { t } = useTranslation(['config', 'guide'])

  return (
    <>
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
            <Button variant="text" onClick={onSkip}>
              {t('skip to manual authentication')}
            </Button>
            .
          </Typography>
        </Box>
      </StepContent>
    </>
  )
}

export const AuthGithubTokenStep: React.FunctionComponent<
  OnContinueProps & OnGoBackProps
> = ({ onContinue, onGoBack }) => {
  const { t } = useTranslation(['config', 'guide'])

  const checkTokenAndContinue = (): void => {
    // TODO: validate token here
    onContinue()
  }

  return (
    <>
      <StepLabel>
        {t('Manually Create and Set an Authentication Token')}
      </StepLabel>
      <StepContent>
        <Typography>
          If you prefer not to use the GitHub App, you can manually create a
          personal access token with the required permissions. When generating
          the token, make sure you enable <code>Contents</code>
          {space}
          repository permissions and set it to <strong>write access</strong>.
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
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            onClick={checkTokenAndContinue}
          >
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
            onClick={onGoBack}
          >
            {t('Go Back to App Authentication')}
          </Button>
        </Box>
      </StepContent>
    </>
  )
}
