import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
const CustomGridToolbar = () => {
  return (
    <GridToolbar
      sx={{
        backgroundColor: '#bdc3c7',
        color: 'white',
        // py: 1,
        '& button': {
          // Tùy chỉnh CSS cho các nút trong GridToolbar
          marginLeft: '8px',
          marginRight: '8px',
          backgroundColor: '#2c3e50',
          color: 'white',
          fontSize: '1.2rem',
          '&:hover': {
            backgroundColor: 'blue'
          }
        }
      }}
    />
  );
};

function TableComponent({ columns, rows = [], getRowId, onRowClick, onRowSelectionModelChange }) {
  return (
    <>
      {/* {<LoadingComponent time={2300}></LoadingComponent>} */}
      <Box sx={{ height: 450, width: '100%', mt: 4 }}>
        <DataGrid
          slots={{ toolbar: CustomGridToolbar }}
          getRowId={getRowId}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowClick={onRowClick}
          onRowSelectionModelChange={onRowSelectionModelChange}
          sx={{
            fontSize: '1.5rem',
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 700
            }
          }}
          componentsProps={{
            Footer: () => (
              <div>
                <Button>fasfdasdfsffffffffffffffffffffff</Button>
              </div>
            )
          }}
        />
      </Box>
    </>
  );
}

export default TableComponent;
