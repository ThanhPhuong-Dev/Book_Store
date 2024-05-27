import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function SearchResult({ product, handleHide }) {
  const navigate = useNavigate();
  const handleClickSearch = () => {
    navigate(`/product-details/${product._id}`);
    handleHide();
  };

  const { 'Image-URL-L': image, 'Book-Title': name, ISBN } = product;
  return (
    <Box
      onClick={handleClickSearch}
      sx={{
        background: 'white',
        p: 1,
        display: 'flex',
        cursor: 'pointer',
        transition: '0,5s',
        '&:hover': {
          background: '#ecf0f1'
        }
      }}
    >
      <Box sx={{ width: '50px', height: '50px', overflow: 'hidden', mr: 2 }}>
        <img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover' }}></img>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        <Typography
          sx={{
            color: 'black',
            fontSize: '1.6rem',
            fontWeight: 700,
            lineHeight: 1.4,
            whiteSpace: 'pre-line',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1
          }}
        >
          {name}
        </Typography>
        <Typography sx={{ fontSize: '1.4rem', fontWeight: 600, lineHeight: 1.4, color: 'red' }}>
          {!isNaN(ISBN) ? Number(ISBN / 100000).toLocaleString() : '120.000'}VND
        </Typography>
      </Box>
    </Box>
  );
}

export default SearchResult;
