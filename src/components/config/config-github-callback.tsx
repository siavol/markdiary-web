import React from 'react'
import { useSearchParams } from 'react-router-dom'

const ConfigGithubCallback: React.FunctionComponent = () => {
  const [searchParams] = useSearchParams()

  const gitHubCode = searchParams.get('code')

  return <div>Code is: {gitHubCode}</div>
}

export default ConfigGithubCallback
