import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout'
import RecordsList from './components/record/records-list'
import RecordNew from './components/record/record-new'
import RecordView from './components/record/record-view'
import ConfigGithub from './components/config/config-github'
import {
  newRecordAction,
  recordsLoader,
} from './components/record/record-actions'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <RecordsList />,
        loader: recordsLoader,
      },
      {
        path: 'new',
        element: <RecordNew />,
        action: newRecordAction,
      },
      {
        path: 'view/:recordId',
        element: <RecordView />,
      },
      {
        path: 'config',
        element: <ConfigGithub />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
