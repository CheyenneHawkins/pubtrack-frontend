import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToolSection1 from './ToolSection1';
import ToolSectionThesaurus from './ToolSectionThesaurus';
import ToolSectionRhymes from './ToolSectionRhymes';
import ToolSectionUrbanDict from './ToolSectionUrbanDict';

const drawerWidth = 240;


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function SessionToolDrawer(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={props.open}
      >
        <DrawerHeader>
          <span className='tool-drawer-header-text'>
            Tools
          </span>
        </DrawerHeader>
        {/* <Divider /> */}
        <div className='tools-wrapper'>
        <ToolSection1/>
        <ToolSectionThesaurus/>
        <ToolSectionRhymes/>
        <ToolSectionUrbanDict/>
        </div>
        <Divider />
        
      </Drawer>
    </Box>
    </>
  );
}