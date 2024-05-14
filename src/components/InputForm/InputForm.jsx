import { FormControl, Input, InputLabel } from '@mui/material';

function InputForm({ label, id, type, value, handleChange, endAdornment }) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel
        htmlFor={id}
        sx={{
          fontSize: '1.6rem',
          '&.Mui-focused': {
            color: '#ee4d2d'
          }
        }}
      >
        {label}
      </InputLabel>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        endAdornment={endAdornment}
        sx={{
          fontSize: '1.6rem',
          '::after': {
            borderBottom: '2px solid #ee4d2d'
          }
        }}
      />
    </FormControl>
  );
}

export default InputForm;
