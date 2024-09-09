// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const requiredEnvs = [
  'REACT_APP_GITHUB_APP_NAME',
  'REACT_APP_GITHUB_APP_CLIENT_ID',
  'REACT_APP_GITHUB_APP_EXCHANGE_URL',
  'REACT_APP_GITHUB_APP_REFRESH_URL',
]
for (const envVar of requiredEnvs) {
  if (!process.env[envVar]) {
    throw new Error(`Required env variable ${envVar} is missing.`)
  }
}
console.log('All required env variables are defined')
