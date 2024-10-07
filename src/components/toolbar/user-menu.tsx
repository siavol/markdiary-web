import React from 'react'
import {
  Avatar,
  Badge,
  CircularProgress,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings'
import GitHubIcon from '@mui/icons-material/GitHub'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import useUser from '../../hooks/useUser'

type MenuItemOnClickProps = {
  onClick: () => void
}

const ConfigurationMenuItem: React.FunctionComponent<MenuItemOnClickProps> = ({
  onClick,
}) => {
  return (
    <MenuItem onClick={onClick} to="/config" component={RouterLink}>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText>Configuration</ListItemText>
    </MenuItem>
  )
}

const SourceCodeMenuItem: React.FunctionComponent<MenuItemOnClickProps> = ({
  onClick,
}) => {
  const githubUrl = process.env.REACT_APP_MARKDIARY_GITHUB_URL

  if (githubUrl)
    return (
      <MenuItem
        onClick={onClick}
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        component={Link}
      >
        <ListItemIcon>
          <GitHubIcon />
        </ListItemIcon>
        <ListItemText>GitHub</ListItemText>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <OpenInNewIcon fontSize="small" />
        </Typography>
      </MenuItem>
    )
  else return null
}

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
          <ConfigurationMenuItem onClick={handleClose} />
          <SourceCodeMenuItem onClick={handleClose} />
        </Menu>
      </>
    )
  }

  return null
}

export default UserMenu
