import React, { useState } from 'react'
import { writeFileContent } from '../../services/github'
import { loadConfig } from '../../services/config-storage'

const NewRecord: React.FunctionComponent = () => {
  const [content, setContent] = useState('')

  const handleSave = (): void => {
    const config = loadConfig()
    const now = new Date()
    const title = now.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    writeFileContent(title, content, now, config).then((data) =>
      console.log('record saved', data)
    )
  }

  return (
    <div>
      <h2>New Record</h2>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          cols={50}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  )
}

export default NewRecord
