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
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

const ConfigGuide: React.FunctionComponent = () => {
  const { t } = useTranslation(['config', 'guide'])
  const [activeStep, setActiveStep] = React.useState(0)

  return (
    <Container>
      <Stepper orientation="vertical" activeStep={activeStep}>
        <Step key="create-repo">
          <StepLabel>{t('Create GitHub repository')}</StepLabel>
          <StepContent>
            <Typography>
              Before you begin journaling, you&aposll need to create a GitHub
              repository where your diary entries will be securely stored. For
              privacy, we recommend creating a{' '}
              <strong>private repository</strong> unless you want to make your
              diary publicly accessible.
            </Typography>
            <Link href="https://github.com/new" target="_blank">
              {t('Create a new repository')}
            </Link>
            <Box>
              <Button
                variant="contained"
                sx={{ mt: 1, mr: 1 }}
                onClick={() => setActiveStep(1)}
              >
                {t('Continue')}
              </Button>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel key="auth-github">{t('GitHub authentication')}</StepLabel>
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
