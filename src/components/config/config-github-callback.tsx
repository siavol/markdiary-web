import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GitHubAppAuth, GitHubAppAuthError } from './config-actions'

function isError(auth: GitHubAppAuth): auth is GitHubAppAuthError {
  return 'error' in auth
}

const ConfigGithubCallback: React.FunctionComponent = () => {
  const auth = useLoaderData() as GitHubAppAuth
  const { t } = useTranslation('config-github-callback')

  if (!isError(auth)) {
    return <div>Code is: {auth.token}</div>
  } else {
    return (
      <div>
        <h1>{t('GitHub authentication failed!')}</h1>
        <p>
          <strong>Error: </strong>
          <span>{auth.error.code}</span>
        </p>
        <p>
          <strong>Description: </strong>
          <span>{auth.error.description}</span>
        </p>
      </div>
    )
  }
}

export default ConfigGithubCallback
