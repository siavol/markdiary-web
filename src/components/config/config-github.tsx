import { ChangeEvent, useEffect, useState } from "react";
import { Config, loadConfig, saveConfig } from '../../services/config-storage';

function ConfigGithub() {
  const [config, setConfig] = useState<Config>({
    github: {
        owner: null,
        repo: null,
        token: null
    }
  });

  useEffect(() => {
    const config = loadConfig();
    setConfig(config);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      github: {
        ...prevConfig.github,
        [name]: value
      }
    }));
  };

  const handleSave = () => {
    saveConfig(config);
  };
  
  return (
    <div>
      <h2>Configure Dairy GitHub Repository.</h2>

      <div>
        <label>
          Owner:
          <input
            type="text"
            name="owner"
            value={config.github.owner || ''}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </label>
      </div>

      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default ConfigGithub;
