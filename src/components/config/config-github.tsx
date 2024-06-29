import { ChangeEvent, useEffect, useState } from "react";
import { Config, loadConfig, saveConfig } from '../../services/config-storage';

function ConfigGithub() {
  const [config, setConfig] = useState<Config>({
    github: {
        owner: null,
        repo: null,
        token: null
    },
    committer: {
      author: null,
      email: null
    }
  });

  useEffect(() => {
    const config = loadConfig();
    setConfig(config);
  }, []);

  const handleChange = (section: keyof Config) => (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [section]: {
        ...prevConfig[section],
        [name]: value
      }
    }));
  };

  const handleSave = () => {
    saveConfig(config);
  };
  
  return (
    <div>
      <h2>Configure Dairy GitHub Connection.</h2>

      <div>
        <h3>Repository</h3>
        <div>
          <label>
            Owner:
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
            Repository:
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
            Token:
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
        <h3>Committer</h3>
        <div>
          <label>
            Name:
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
            Email:
            <input
              type="text"
              name="email"
              value={config.committer.email || ''}
              onChange={handleChange('committer')}
            />
          </label>
        </div>
      </div>

      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default ConfigGithub;
