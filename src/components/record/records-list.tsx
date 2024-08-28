import React from 'react'
import { JournalRecord } from '../../services/journal-repository'
import { Link as RouterLink, useLoaderData } from 'react-router-dom'
import {
  Container,
  Fab,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const RecordsList: React.FunctionComponent = () => {
  const data = useLoaderData() as JournalRecord[]

  return (
    <Container>
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
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          display: { xs: 'flex', sm: 'none' },
        }}
        to="/new"
        component={RouterLink}
      >
        <AddIcon />
      </Fab>
    </Container>
  )
}

export default RecordsList
