import { Avatar, Badge, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import useUser from '../hooks/useUser'

const UserMenu: React.FunctionComponent = () => {
  const { user, loading, error } = useUser()

  if (loading) {
    return (
      <Avatar>
        <CircularProgress />
      </Avatar>
    )
  }

  if (error) {
    return (
      <Badge
        color="error"
        variant="standard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={<Typography>err</Typography>}
        overlap="circular"
      >
        <Avatar></Avatar>
      </Badge>
    )
  }

  if (user) {
    return <Avatar src={user?.avatarUrl}></Avatar>
  }

  return null
}

export default UserMenu
