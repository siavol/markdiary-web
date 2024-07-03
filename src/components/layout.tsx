import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout: React.FunctionComponent = () => {
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
}

export default Layout
