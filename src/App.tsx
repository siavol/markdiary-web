import React from 'react'
import './App.css'
import ConfigGithub from './components/config/config-github'
import NewRecord from './components/record/new-record'

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <header>Markdairy</header>

      <div>Markdiary will be here.</div>
      <ConfigGithub></ConfigGithub>
      <NewRecord></NewRecord>
    </div>
  )
}

export default App
