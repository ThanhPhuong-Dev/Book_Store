import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

export default function UploadComponent({ handleImageChange }) {
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      sx={{ px: 2, fontSize: '1.2rem', backgroundColor: '#34495e' }}
    >
      Upload file
      <VisuallyHiddenInput type="file" onChange={handleImageChange} />
    </Button>
  );
}
