import React, { useState } from 'react'
import { Form } from 'react-router-dom'

const RecordNew: React.FunctionComponent = () => {
  const [content, setContent] = useState('')

  return (
    <Form method="post">
      <h2>New Record</h2>
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        cols={50}
      />
      <button type="submit">Save</button>
    </Form>
  )
}

export default RecordNew
