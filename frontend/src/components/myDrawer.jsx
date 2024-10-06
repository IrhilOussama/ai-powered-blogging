"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import Logout from '@/utils/logout';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    Logout();
    router.push("/");
  }

  const DrawerList = (
    <Box sx={{ width: 250}} role="presentation" onClick={toggleDrawer(false)}>
      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CategoryRoundedIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary={"categories"} />
            </ListItemButton>
          </ListItem>
      </List>
      
      <Divider />

      <List>

          <ListItem key={0} disablePadding>
            <ListItemButton>
              <ListItemText primary={'contact us'} />
            </ListItemButton>
          </ListItem>

          <ListItem key={1} disablePadding>
            <ListItemButton>
              <ListItemText primary={'about'} />
            </ListItemButton>
          </ListItem>

          {isAuthenticated() && (
            <ListItem key={2} disablePadding>
              <ListItemButton>
                <ListItemText primary={'logout'} onClick={handleLogout} />
              </ListItemButton>
            </ListItem>
          )}

      </List>
    </Box>
  );

  return (
    <div>
      <Button color='text.white' onClick={toggleDrawer(true)}> <MenuRoundedIcon /> </Button>
      <Drawer PaperProps={{
        sx: {
            // position: "absolute",
            // top: "60px"
        }
      }} anchor='right' open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}