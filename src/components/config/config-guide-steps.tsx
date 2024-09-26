import React, { useEffect, useState } from 'react'
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
import { Link as RouterLink } from 'react-router-dom'
import { GitHubToken, InstallGitHubApp, LoginToGitHubApp } from './github-auth'
import { GithubRepoSelect } from './github-repo'
import {
  Config,
  GitHubRepoConfig,
  saveGitHubAuthor,
  saveGitHubRepo,
} from '../../services/config-storage'
import useUserRepositories from '../../hooks/useUserRepositories'

type NeedsConfig = {
  config: Config
}

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
        {t('Manually Set an Authentication Token (Alternative)')}
      </StepLabel>
      <StepContent>
        <Typography>
          If you prefer not to use the GitHub App, you can manually create a
          personal access token with the required permissions. When generating
          the token, make sure you enable <code>Contents</code>
          {space}
          repository permissions and set it to <strong>write access</strong>.
        </Typography>

        <GitHubToken />

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

export const SelectRepoStep: React.FunctionComponent<
  NeedsConfig & OnContinueProps
> = ({ config, onContinue }) => {
  const { t } = useTranslation(['config', 'guide'])
  const { repos } = useUserRepositories()
  const [value, setValue] = useState<GitHubRepoConfig>(config.github)

  const saveRepoAndContinue = (): void => {
    saveGitHubRepo(value)
    onContinue()
  }

  return (
    <>
      <StepLabel>{t('Select the GitHub Repository')}</StepLabel>
      <StepContent>
        <Typography>
          Now, select the GitHub repository you created in the previous step.
          This will be the secure location where your journal entries are
          stored. Ensure you choose the correct repository to keep your personal
          entries safe and organized.
        </Typography>

        {/* Repository Select Input */}
        <Box mt={2}>
          <GithubRepoSelect
            value={value}
            repos={repos ?? []}
            onChange={setValue}
          />
        </Box>

        {/* Continue Button */}
        <Box mt={2}>
          <Button
            variant="contained"
            sx={{ mt: 1, mr: 1 }}
            onClick={saveRepoAndContinue}
            disabled={!value.owner || !value.repo}
          >
            Continue
          </Button>
        </Box>
      </StepContent>
    </>
  )
}

export const ConfigureAuthorStep: React.FunctionComponent<OnContinueProps> = ({
  onContinue,
}) => {
  const { t } = useTranslation(['config', 'guide'])
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const handleContinue = (): void => {
    saveGitHubAuthor({
      author: name,
      email: email,
    })
    onContinue()
  }

  return (
    <>
      <StepLabel>Configure Author for GitHub Commits</StepLabel>
      <StepContent>
        <Typography>
          Specify the author name and email that will be associated with your
          GitHub commits. These details will appear in the commit history of
          your repository for each journal entry.
        </Typography>

        {/* Name Input */}
        <Box mt={2}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>

        {/* Email Input */}
        <Box mt={2}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>

        {/* Continue Button */}
        <Box mt={2}>
          <Button
            variant="contained"
            sx={{ mt: 1, mr: 1 }}
            onClick={handleContinue}
            disabled={!name || !email}
          >
            {t('Continue')}
          </Button>
        </Box>
      </StepContent>
    </>
  )
}

export const AppConfiguredStep: React.FunctionComponent = () => {
  const { t } = useTranslation(['config', 'guide'])

  return (
    <>
      <StepLabel>{t('Setup Complete!')}</StepLabel>
      <StepContent>
        <Typography variant="h6" gutterBottom>
          Congratulations!
        </Typography>
        <Typography>
          You{apos}ve successfully completed the setup process. The journaling
          app is now ready to go. Start journaling right away by writing your
          first entry and storing your thoughts securely.
        </Typography>

        {/* Button to create the first journal entry */}
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            to="/new"
            component={RouterLink}
          >
            Create First Record
          </Button>
        </Box>
      </StepContent>
    </>
  )
}
