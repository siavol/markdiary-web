import React, { ChangeEvent, useEffect, useState } from 'react'
import { Config, loadConfig, saveConfig } from '../../services/config-storage'
import { useTranslation } from 'react-i18next'

const ConfigGithub: React.FunctionComponent = () => {
  const [config, setConfig] = useState<Config>({
    github: {
      owner: null,
      repo: null,
      token: null,
    },
    committer: {
      author: null,
      email: null,
    },
  })
  const { t } = useTranslation(['config', 'general'])

  useEffect(() => {
    const configFromStorage = loadConfig()
    setConfig(configFromStorage)
  }, [])

  const handleChange =
    (section: keyof Config) => (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setConfig((prevConfig) => ({
        ...prevConfig,
        [section]: {
          ...prevConfig[section],
          [name]: value,
        },
      }))
    }

  const handleSave = (): void => {
    saveConfig(config)
  }

  const ghAppClientId = process.env.REACT_APP_GITHUB_APP_CLIENT_ID
  let gitHubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${ghAppClientId}`
  if (process.env.REACT_APP_GITHUB_APP_CALLBACK) {
    gitHubAuthUrl += `&redirect_uri=${process.env.REACT_APP_GITHUB_APP_CALLBACK}`
  }

  return (
    <div>
      <h1>{t('Configure Dairy GitHub Connection.')}</h1>

      <h2>{t('1. Connect to GitHub')}</h2>

      <h3>{t('With GitHub App')}</h3>
      <div>
        <a href={gitHubAuthUrl}>Login with GitHub</a>
      </div>

      <h3>{t('OR with GitHub Token')}</h3>
      <div>
        <label>
          {t('Token:')}
          <input
            type="password"
            name="token"
            value={config.github.token || ''}
            onChange={handleChange('github')}
          />
        </label>
      </div>

      <h2>{t('2. Select repository')}</h2>
      <div>
        <div>
          <label>
            {t('Owner:')}
            <input
              type="text"
              name="owner"
              value={config.github.owner || ''}
              onChange={handleChange('github')}
            />
          </label>
        </div>
        <div>
          <label>
            {t('Repository:')}
            <input
              type="text"
              name="repo"
              value={config.github.repo || ''}
              onChange={handleChange('github')}
            />
          </label>
        </div>
      </div>

      <h2>{t('3. Name yourself for git')}</h2>
      <div>
        <h4>{t('Committer')}</h4>
        <div>
          <label>
            {t('Name:')}
            <input
              type="text"
              name="author"
              value={config.committer.author || ''}
              onChange={handleChange('committer')}
            />
          </label>
        </div>
        <div>
          <label>
            {t('Email:')}
            <input
              type="text"
              name="email"
              value={config.committer.email || ''}
              onChange={handleChange('committer')}
            />
          </label>
        </div>
      </div>

      <button onClick={handleSave}>{t('Save', { ns: 'general' })}</button>
    </div>
  )
}

export default ConfigGithub
