import React from 'react'
import ConfigGithub from './components/config/config-github'
import NewRecord from './components/record/new-record'
import ViewRecord from './components/record/view-record'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import Layout from './components/layout'
import ListRecords from './components/record/list-records'

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListRecords />} />
          <Route path="new" element={<NewRecord />} />
          <Route path="view/:recordId" element={<ViewRecord />} />
          <Route path="config" element={<ConfigGithub />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
