import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getRepos, GitHubRepo } from '../../services/github'
import {
  ConfigStatus,
  GitHubRepoConfig,
  hasConfigured,
  loadConfig,
  saveGitHubRepo,
} from '../../services/config-storage'

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
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [value, setValue] = useState<GitHubRepoConfig>(config.github)

  useEffect(() => {
    if (hasConfigured(ConfigStatus.Auth)) {
      getRepos(config).then((data) => setRepos(data))
    }
  }, [config])

  const saveRepoConfig = (newValue: RepoValue): void => {
    saveGitHubRepo(newValue)
    setValue(newValue)
  }

  return (
    <GithubRepoSelect repos={repos} value={value} onChange={saveRepoConfig} />
  )
}
