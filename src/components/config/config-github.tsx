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

  return (
    <div>
      <h2>{t('Configure Dairy GitHub Connection.')}</h2>

      <div>
        <h3>{t('Repository')}</h3>
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
      </div>

      <div>
        <h3>{t('Committer')}</h3>
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
