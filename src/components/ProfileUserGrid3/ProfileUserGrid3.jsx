import { Avatar, Box, Grid, Typography } from '@mui/material';
import cutTheFirstLetter from '~/utils/cutTheFirstLetter';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { useNavigate } from 'react-router-dom';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
function ProfileUserGrid3({ user }) {
  const navigate = useNavigate();
  return (
    <Grid sx={{ ml: 5 }} item xs={3} md={3} borderRight="2px solid #ccc">
      <Typography variant="h5">Thông Tin Người Dùng</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 2,
          '& .MuiAvatar-root': {
            bgcolor: '#ef6c00',
            width: '50px',
            height: '50px',
            fontWeight: 700,
            fontSize: '1.5rem',
            textAlign: 'center',
            mr: 2
          }
        }}
      >
        {user?.avatar ? (
          <Avatar alt="Remy Sharp" src={user?.avatar} />
        ) : (
          <Avatar>{cutTheFirstLetter(user?.name)}</Avatar>
        )}
        <Typography
          sx={{
            fontSize: '1.8rem',
            fontWeight: 600,
            overflow: 'hidden',
            whiteSpace: 'normal' /* Ngăn chữ xuống dòng */,
            textOverflow: 'ellipsis'
          }}
        >
          {user?.name}
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Box
          onClick={() => navigate('/profile')}
          sx={{
            mt: 2,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            '& .MuiSvgIcon-root ': {
              fontSize: '2.5rem',
              color: '#d35400',
              mr: 2
            },
            '& .MuiTypography-root': {
              fontSize: '1.4rem'
            },
            ':hover': {
              color: '#cca77f'
            }
          }}
        >
          <PersonOutlineIcon></PersonOutlineIcon>
          <Typography>Tài Khoản Của Tôi</Typography>
        </Box>
        <Box
          onClick={() => navigate('/purchase')}
          sx={{
            mt: 2,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            '& .MuiSvgIcon-root ': {
              fontSize: '2.5rem',
              color: '#3498db',
              mr: 2
            },
            '& .MuiTypography-root': {
              fontSize: '1.4rem'
            },
            ':hover': {
              color: '#cca77f'
            }
          }}
        >
          <ContentPasteIcon></ContentPasteIcon>
          <Typography>Đơn Mua</Typography>
        </Box>
        {/* <Box
          onClick={() => navigate('/load-coin')}
          sx={{
            mt: 2,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            '& .MuiSvgIcon-root ': {
              fontSize: '2.5rem',
              color: '#c0392b',
              mr: 2
            },
            '& .MuiTypography-root': {
              fontSize: '1.4rem'
            },
            ':hover': {
              color: '#cca77f'
            }
          }}
        >
          <LocalAtmIcon></LocalAtmIcon>
          <Typography>Nạp Tiền</Typography>
        </Box> */}
      </Box>
    </Grid>
  );
}

export default ProfileUserGrid3;
