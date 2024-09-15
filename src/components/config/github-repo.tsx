import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { GitHubRepo } from '../../services/github'

export type RepoValue = {
  owner: string | null
  repo: string | null
}

type GithubRepoSelectProps = {
  repos: GitHubRepo[]
  value: RepoValue
  onChange: (value: RepoValue) => void
}

const GithubRepoSelect: React.FunctionComponent<GithubRepoSelectProps> = ({
  repos,
  value,
  onChange,
}) => {
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
        <TextField {...params} variant="standard" label="Dairy repository" />
      )}
    />
  )
}

export default GithubRepoSelect
