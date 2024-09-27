import React, { useState } from 'react'
import { Box, TextField } from '@mui/material'
import {
  GitHubAuthConfig,
  GitHubAuthorConfig,
  loadConfig,
  saveGitHubAuthor,
} from '../../services/config-storage'

type GitHubAuthorProps = Partial<GitHubAuthorConfig> & {
  onChange?(config: GitHubAuthorConfig): void
}

export const GitHubAuthor: React.FunctionComponent<GitHubAuthorProps> = (
  props
) => {
  const [name, setName] = useState<string>(props.author ?? '')
  const [email, setEmail] = useState<string>(props.email ?? '')

  const handleChange = (newConfig: GitHubAuthorConfig): void => {
    saveGitHubAuthor(newConfig)
    props.onChange && props.onChange(newConfig)
  }

  return (
    <>
      {/* Name Input */}
      <Box mt={2}>
        <TextField
          fullWidth
          label="User name"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            handleChange({
              author: e.target.value,
              email: email,
            })
          }}
          required
        />
      </Box>

      {/* Email Input */}
      <Box mt={2}>
        <TextField
          fullWidth
          label="User email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            handleChange({
              author: name,
              email: e.target.value,
            })
          }}
          required
        />
      </Box>
    </>
  )
}

export const ConfigGitHubAuthor: React.FunctionComponent = () => {
  const config = loadConfig()

  return (
    <Box>
      <GitHubAuthor
        author={config.committer.author}
        email={config.committer.email}
      />
    </Box>
  )
}
