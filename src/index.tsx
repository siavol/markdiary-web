import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout'
import ListRecords from './components/record/list-records'
import NewRecord, { newRecordAction } from './components/record/new-record'
import ViewRecord from './components/record/view-record'
import ConfigGithub from './components/config/config-github'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ListRecords />,
      },
      {
        path: 'new',
        element: <NewRecord />,
        action: newRecordAction,
      },
      {
        path: 'view/:recordId',
        element: <ViewRecord />,
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
