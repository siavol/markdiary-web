import React from 'react';
import './App.css';
import ConfigGithub from './components/config/config-github';
import NewRecord from './components/record/new-record';


function App() {
  return (
    <div className="App">
      <header>Markdairy</header>

      <div>Markdiary will be here.</div>
      <ConfigGithub></ConfigGithub>
      <NewRecord></NewRecord>
    </div>
  );
}

export default App;
