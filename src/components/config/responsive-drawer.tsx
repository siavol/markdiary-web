import { Drawer } from '@mui/material'
import React, { ReactNode } from 'react'
import { useOutletContext } from 'react-router-dom'
import { LayoutContext } from '../layout'

type ResponsiveDrawerProps = {
  children: ReactNode
  drawerWidth: number
}

const ResponsiveDrawer: React.FunctionComponent<ResponsiveDrawerProps> = ({
  children,
  drawerWidth,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  const { onMenuClick } = useOutletContext<LayoutContext>()

  const handleDrawerClose = (): void => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = (): void => {
    setIsClosing(false)
  }

  const handleDrawerToggle = (): void => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  onMenuClick(handleDrawerToggle)

  return (
    <>
      <Drawer
        // container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {children}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: 'none', sm: 'block' },
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {children}
      </Drawer>
    </>
  )
}

export default ResponsiveDrawer
