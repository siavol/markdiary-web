import React from 'react'
import { Link, Outlet, useNavigation } from 'react-router-dom'

const Layout: React.FunctionComponent = () => {
  const navigation = useNavigation()

  if (navigation.state === 'idle') {
    return (
      <div>
        <header>Markdairy</header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/new">New record</Link>
            </li>
            <li>
              <Link to="/config">Configuration</Link>
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
        <p>loading...</p>
      </div>
    )
  }
}

export default Layout
