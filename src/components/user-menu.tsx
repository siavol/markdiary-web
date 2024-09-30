import React from 'react'
import {
  Avatar,
  Badge,
  CircularProgress,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings'
import useUser from '../hooks/useUser'

const UserMenu: React.FunctionComponent = () => {
  const { user, loading, error } = useUser()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }

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
    return (
      <>
        <Tooltip title="Application menu">
          <IconButton
            onClick={handleClick}
            aria-controls={open ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={user?.avatarUrl}></Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="user-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem onClick={handleClose} to="/config" component={RouterLink}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            Configuration
          </MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>
      </>
    )
  }

  return null
}

export default UserMenu
