import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import { GitHubApiError } from '../services/github-error'

const ErrorBoundary: React.FunctionComponent = () => {
  const error = useRouteError()

  if (error instanceof GitHubApiError && error.status === 401) {
    return (
      <div>
        <h1>Authentication error!</h1>
        <p>
          <span>Check your GitHub credentials are valid </span>
          <Link to="/config">in config.</Link>
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Unknown error!</h1>
        <p>Something weird happened. Try again later.</p>
      </div>
    )
  }
}

export default ErrorBoundary
