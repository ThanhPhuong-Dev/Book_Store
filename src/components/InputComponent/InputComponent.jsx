import { Box, Typography } from '@mui/material';

function InputComponent({ label, id, name, value, type, handleChange, width, disabled }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        '& .MuiTypography-root': {
          fontSize: '1.4rem',
          fontWeight: 600
        }
      }}
    >
      <Typography>{label}</Typography>
      <input
        id={id}
        value={value}
        type={type}
        name={name}
        style={{
          maxWidth: `${width}`,
          minWidth: `${width}`,
          outline: 'none',
          padding: '12px',
          border: '1px solid #ccc'
        }}
        onChange={handleChange}
        disabled={disabled}
      ></input>
    </Box>
  );
}

export default InputComponent;
