import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ConfigGithubCallback: React.FunctionComponent = () => {
  const { t } = useTranslation('config-github-callback')

  return (
    <div>
      <p>{t('GitHub token generated.')}</p>
      <Link to="/config">{t('Continue configuration')}</Link>
    </div>
  )
}

export default ConfigGithubCallback
