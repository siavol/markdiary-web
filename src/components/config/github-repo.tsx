import {
  Alert,
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import { GitHubRepo } from '../../services/github'
import {
  GitHubRepoConfig,
  loadConfig,
  saveGitHubRepo,
} from '../../services/config-storage'
import useUserRepositories from '../../hooks/useUserRepositories'

export type RepoValue = {
  owner: string | null
  repo: string | null
}

type GithubRepoSelectProps = {
  repos: GitHubRepo[]
  value: RepoValue
  onChange: (value: RepoValue) => void
}

export const GithubRepoSelect: React.FunctionComponent<
  GithubRepoSelectProps
> = ({ repos, value, onChange }) => {
  const handleChange = (fullName: string | null): void => {
    if (fullName) {
      const [owner, repo] = (fullName || '').split('/', 2)
      onChange({ owner, repo })
    } else {
      onChange({
        owner: null,
        repo: null,
      })
    }
  }

  return (
    <Autocomplete
      id="repo-name-input"
      aria-describedby="repo-name-helper-input"
      value={value.owner && value.repo ? `${value.owner}/${value.repo}` : ''}
      onChange={(_event, newInputValue) => {
        handleChange(newInputValue)
      }}
      disablePortal
      options={repos.map((r) => r.fullName)}
      renderInput={(params) => (
        <TextField {...params} label="Dairy repository" />
      )}
    />
  )
}

export const ConfigGitHubRepo: React.FunctionComponent = () => {
  const config = loadConfig()
  const { repos, loading, error } = useUserRepositories()
  const [value, setValue] = useState<GitHubRepoConfig>(config.github)

  const saveRepoConfig = (newValue: RepoValue): void => {
    saveGitHubRepo(newValue)
    setValue(newValue)
  }

  return (
    <Box>
      {!!error && (
        <Alert severity="error">Failed to load repositories list</Alert>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <GithubRepoSelect
          repos={repos || []}
          value={value}
          onChange={saveRepoConfig}
        />
      )}
    </Box>
  )
}
