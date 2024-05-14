import { Box } from '@mui/material';

function TabPanelComponent({ value, index, children }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      //   {...other}
    >
      {value == index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </Box>
  );
}
export default TabPanelComponent;
