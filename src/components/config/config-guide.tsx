import React from 'react'
import { Container, Step, StepLabel, Stepper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ConfigStatus, getConfigStatus } from '../../services/config-storage'
import {
  AuthGithubAppStep,
  AuthGithubTokenStep,
  CreateRepoStep,
  SelectRepoStep,
} from './config-guide-steps'

type ConfigSteps =
  | 'create-repo'
  | 'auth-github-app'
  | 'manual-auth-token'
  | 'select-repo'
  | 'configure-author'

function GetStepForConfigStatus(): ConfigSteps {
  const status = getConfigStatus()

  if (!(status & ConfigStatus.Auth)) return 'create-repo'
  if (!(status & ConfigStatus.Repo)) return 'select-repo'
  if (!(status & ConfigStatus.Author)) return 'configure-author'

  return 'select-repo'
}

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
      case 'configure-author':
        return 4
      default:
        return 0
    }
  }

  const { t } = useTranslation(['config', 'guide'])
  const [activeStep, setActiveStep] = React.useState(
    getStepNo(GetStepForConfigStatus())
  )

  const gotoStep = (step: ConfigSteps): (() => void) => {
    return () => {
      setActiveStep(getStepNo(step))
    }
  }

  return (
    <Container>
      <Stepper orientation="vertical" activeStep={activeStep}>
        <Step key="create-repo">
          <CreateRepoStep onContinue={gotoStep('auth-github-app')} />
        </Step>
        <Step key="auth-github">
          <AuthGithubAppStep onSkip={gotoStep('manual-auth-token')} />
        </Step>
        <Step key="manual-auth-token">
          <AuthGithubTokenStep
            onContinue={gotoStep('select-repo')}
            onGoBack={gotoStep('auth-github-app')}
          />
        </Step>
        <Step key="select-repo">
          <SelectRepoStep onContinue={gotoStep('configure-author')} />
        </Step>
        <Step key="configure-author">
          <StepLabel>{t('Setup your name')}</StepLabel>
        </Step>
      </Stepper>
    </Container>
  )
}

export default ConfigGuide
