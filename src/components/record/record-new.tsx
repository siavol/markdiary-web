import React, { useState } from 'react'
import { ActionFunctionArgs, Form, redirect } from 'react-router-dom'
import { loadConfig } from '../../services/config-storage'
import { createRecord } from '../../services/journal-repository'

export async function newRecordAction(
  args: ActionFunctionArgs
): Promise<Response> {
  const values = Object.fromEntries(await args.request.formData())

  const config = loadConfig()
  await createRecord(values.content.toString(), config)

  return redirect('/')
}

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
