import React from 'react'
import { IconButton } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'

const SourceCodeLink: React.FunctionComponent = () => {
  const githubUrl = process.env.REACT_APP_MARKDIARY_GITHUB_URL

  if (githubUrl)
    return (
      <IconButton
        color="inherit"
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
      </IconButton>
    )
  else return null
}

export default SourceCodeLink
