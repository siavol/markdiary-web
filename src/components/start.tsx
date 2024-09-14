import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const Start: React.FunctionComponent = () => {
  const startButton = (
    <Box display="flex" justifyContent="center">
      <Button
        variant="contained"
        color="success"
        component={RouterLink}
        to="/config-guide"
      >
        Start
      </Button>
    </Box>
  )

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h2" gutterBottom align="center">
          Secure, Private Journaling with GitHub Integration
        </Typography>
        <Typography variant="body1" align="justify" color="textSecondary">
          Effortlessly write and store your daily records with the convenience
          and security of your personal GitHub repository. Your thoughts, safely
          kept.
        </Typography>
      </Box>

      {startButton}

      <Box my={4}>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h5" component="h2">
                  Write Your Diary and Store Data in Your GitHub Repository
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="textSecondary">
                  Capture your personal thoughts and daily experiences in a
                  diary format, which is automatically stored in a private
                  GitHub repository of your choice. You own your data entirely,
                  with no third-party storage involved.
                </Typography>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h5" component="h2">
                  Your Data, Your Privacy: No Data Collection
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="textSecondary">
                  The application runs entirely in your browser, without sending
                  any information to external servers. Everything you write
                  stays on your local machine and your private GitHub repository
                  — ensuring complete privacy and control.
                </Typography>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h5" component="h2">
                  Open Source and Transparent
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="textSecondary">
                  The project is completely open source, allowing anyone to
                  inspect the code, contribute to its development, or customize
                  the application for their own needs. Transparency is at the
                  core, so you know exactly how your data is handled.
                </Typography>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h5" component="h2">
                  No Access to Other Repositories
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="textSecondary">
                  The application is designed to interact only with the
                  repository you choose for storing your diary. It does not
                  access any other repositories or data on your GitHub account,
                  keeping the rest of your projects secure and isolated.
                </Typography>
              }
            />
          </ListItem>
        </List>

        {startButton}
      </Box>
    </Container>
  )
}

export default Start
