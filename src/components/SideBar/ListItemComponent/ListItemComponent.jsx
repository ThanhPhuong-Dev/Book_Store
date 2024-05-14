import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

function ListItemComponent({ icon, primary, handleClick, open }) {
  return (
    <ListItem disablePadding sx={{ display: 'block' }} onClick={handleClick}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',

            '& .MuiSvgIcon-root': {
              fontSize: '2rem'
            }
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={primary}
          sx={{
            opacity: open ? 1 : 0,
            '& .MuiTypography-root': {
              fontSize: '1.4rem',
              fontWeight: 600
            }
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default ListItemComponent;
