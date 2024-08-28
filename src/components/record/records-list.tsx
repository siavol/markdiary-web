import React from 'react'
import { JournalRecord } from '../../services/journal-repository'
import { Link as RouterLink, useLoaderData } from 'react-router-dom'
import { List, ListItemButton, ListItemText } from '@mui/material'

const RecordsList: React.FunctionComponent = () => {
  const data = useLoaderData() as JournalRecord[]

  return (
    <List>
      {data.map((r) => (
        <ListItemButton
          key={r.path}
          to={`view/${r.name}`}
          component={RouterLink}
        >
          <ListItemText>{r.name}</ListItemText>
        </ListItemButton>
      ))}
    </List>
  )
}

export default RecordsList
