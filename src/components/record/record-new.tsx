import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from 'react-router-dom'

const RecordNew: React.FunctionComponent = () => {
  const [content, setContent] = useState('')
  const { t } = useTranslation(['record', 'general'])

  return (
    <Container>
      <Typography variant="h4">{t('New Record')}</Typography>
      <Form method="post">
        <Stack>
          <TextField
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            minRows={20}
          />
          <Button type="submit" variant="contained">
            {t('Save', { ns: 'general' })}
          </Button>
        </Stack>
      </Form>
    </Container>
  )
}

export default RecordNew
