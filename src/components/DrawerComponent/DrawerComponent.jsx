import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/material';

function DrawerComponent({ anchor, openDrawer, closeDrawer, children, onClose }) {
  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }

  //   setState({ ...state, [anchor]: open });
  // };

  return (
    <Box>
      <Drawer anchor={anchor} open={openDrawer} onClose={closeDrawer} >
        {children}
      </Drawer>
    </Box>
  );
}

export default DrawerComponent;
