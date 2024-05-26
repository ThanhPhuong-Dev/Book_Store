import Tippy from '@tippyjs/react/headless';
import { Box } from '@mui/material';
import SearchResult from './SearchResult/SearchResult';

function TippyComponent({ children, resultSearch, handleHide, showResult }) {
  return (
    <Tippy
      interactive={true}
      visible={showResult && resultSearch?.data?.length > 0}
      placement="top-start"
      onClickOutside={handleHide}
      render={(attrs) => (
        <div className="box" tabIndex="-1" {...attrs} style={{ width: '630px' }}>
          <Box
            sx={{
              backgroundColor: 'white',
              width: '100%',
              maxHeight: 'min((100vh - 96px) - 60px, 734px)',
              minHeight: '100px',
              py: 1,
              borderRadius: '8px',
              boxShadow: '1px 1px 1px #ccc',
              overflowY: 'auto'
            }}
          >
            {resultSearch?.data?.map((product) => (
              <SearchResult key={product._id} product={product} handleHide={handleHide}></SearchResult>
            ))}
          </Box>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default TippyComponent;
