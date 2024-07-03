import React from 'react'
import ConfigGithub from './components/config/config-github'
import NewRecord from './components/record/new-record'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import Layout from './components/layout'

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Records list will be here</div>} />
          <Route path="new" element={<NewRecord />} />
          <Route path="config" element={<ConfigGithub />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
