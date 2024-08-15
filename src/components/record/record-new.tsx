import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from 'react-router-dom'

const RecordNew: React.FunctionComponent = () => {
  const [content, setContent] = useState('')
  const { t } = useTranslation(['record', 'general'])

  return (
    <Form method="post">
      <h2>{t('New Record')}</h2>
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        cols={50}
      />
      <button type="submit">{t('Save', { ns: 'general' })}</button>
    </Form>
  )
}

export default RecordNew
