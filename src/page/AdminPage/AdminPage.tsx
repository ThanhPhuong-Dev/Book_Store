import React from 'react';
import { Box } from '@mui/material';
import SideBar from '~/components/SideBar/SideBar';
function AdminPage({ children }) {
  return (
    <Box>
      <SideBar></SideBar>
      {children}
    </Box>
  );
}

export default AdminPage;
