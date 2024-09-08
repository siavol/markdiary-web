import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, useActionData } from 'react-router-dom'
import { SaveRecordProblem } from './record-actions'

const RecordNew: React.FunctionComponent = () => {
  const savingProblem = useActionData() as SaveRecordProblem | undefined
  const [content, setContent] = useState(savingProblem?.recordText || '')
  const { t } = useTranslation(['record', 'general'])

  const errorAlert = savingProblem ? (
    <Alert severity="error">Saving failed: {savingProblem.error.message}</Alert>
  ) : null

  return (
    <Container>
      {errorAlert}
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
