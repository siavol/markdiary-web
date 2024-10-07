import React from 'react'
import { ConfigStatus, hasConfigured } from '../../services/config-storage'
import { Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NewRecordButton: React.FunctionComponent = () => {
  const isConfigured = hasConfigured(ConfigStatus.Full)
  const { t } = useTranslation(['layout', 'general'])

  if (isConfigured)
    return (
      <Button
        to="/new"
        color="inherit"
        component={RouterLink}
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        {t('New record')}
      </Button>
    )
  else return null
}

export default NewRecordButton
