import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ConfigGithubCallback: React.FunctionComponent = () => {
  const [searchParams] = useSearchParams()
  const { t } = useTranslation('config-github-callback')

  const gitHubCode = searchParams.get('code')
  const gitHubError = searchParams.get('error')
  const gitHubErrorDescription = searchParams.get('error_description')

  if (!gitHubError) {
    return <div>Code is: {gitHubCode}</div>
  } else {
    return (
      <div>
        <h1>{t('GitHub authentication failed!')}</h1>
        <p>
          <strong>Error: </strong>
          <span>{gitHubError}</span>
        </p>
        <p>
          <strong>Description: </strong>
          <span>{gitHubErrorDescription}</span>
        </p>
      </div>
    )
  }
}

export default ConfigGithubCallback
