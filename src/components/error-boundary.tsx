import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import { GitHubApiError } from '../services/github-error'
import { useTranslation } from 'react-i18next'

const ErrorBoundary: React.FunctionComponent = () => {
  const error = useRouteError()
  const { t } = useTranslation('error')

  if (error instanceof GitHubApiError && error.status === 401) {
    return (
      <div>
        <h1>{t('Authentication error!')}</h1>
        <p>
          <Link to="/config">
            {t('Check your GitHub credentials are valid in config.')}
          </Link>
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>{t('Unknown error!')}</h1>
        <p>{t('Something weird happened. Try again later.')}</p>
      </div>
    )
  }
}

export default ErrorBoundary
