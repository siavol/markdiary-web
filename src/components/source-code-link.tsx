import React from 'react'
import { IconButton } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'

const SourceCodeLink: React.FunctionComponent = () => {
  return (
    <IconButton
      color="inherit"
      href={process.env.REACT_APP_MARKDIARY_GITHUB_URL ?? ''}
      target="_blank"
      rel="noopener noreferrer"
    >
      <GitHubIcon />
    </IconButton>
  )
}

export default SourceCodeLink
