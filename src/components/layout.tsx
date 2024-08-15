import React from 'react'
import { Link, Outlet, useNavigation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Layout: React.FunctionComponent = () => {
  const navigation = useNavigation()
  const { t } = useTranslation(['layout', 'general'])

  if (navigation.state === 'idle') {
    return (
      <div>
        <header>Markdairy</header>
        <nav>
          <ul>
            <li>
              <Link to="/">{t('Home')}</Link>
            </li>
            <li>
              <Link to="/new">{t('New record')}</Link>
            </li>
            <li>
              <Link to="/config">{t('Configuration')}</Link>
            </li>
          </ul>
        </nav>

        <hr />
        <Outlet />
      </div>
    )
  } else {
    return (
      <div>
        <p>{t('loading...', { ns: 'general' })}</p>
      </div>
    )
  }
}

export default Layout
