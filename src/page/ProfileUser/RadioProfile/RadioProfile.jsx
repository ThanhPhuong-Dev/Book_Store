import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
function RadioProfile({ name, value, handleChange }) {
  return (
    <FormControl
      fullWidth
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        mb: 2,
        '& .MuiFormLabel-root': {
          fontSize: '1.4rem',
          fontWeight: 600,
          mr: 14
        }
      }}
    >
      <FormLabel id="radio-gender">Giới Tính</FormLabel>
      <RadioGroup
        row
        aria-labelledby="radio-gender"
        name={name}
        value={value}
        onChange={handleChange}
        sx={{
          '& .MuiTypography-root': {
            fontSize: '1.4rem'
          }
        }}
      >
        <FormControlLabel value="male" control={<Radio />} label="Nam" />
        <FormControlLabel value="female" control={<Radio />} label="Nữ" />
        <FormControlLabel value="other" control={<Radio />} label="Khác" />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioProfile;
