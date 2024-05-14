import { Avatar, Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ProfileUserGrid3 from '~/components/ProfileUserGrid3/ProfileUserGrid3';
import TabsComponent from '~/components/TabsComponent/TabsComponent';
import cutTheFirstLetter from '~/utils/cutTheFirstLetter';

function PurchasePage() {
  const user = useSelector((state) => state.user);
  return (
    <Grid container sx={{ pt: 2 }}>
      <ProfileUserGrid3 user={user}></ProfileUserGrid3>
      <Grid item xs={8}>
        <TabsComponent></TabsComponent>
      </Grid>
    </Grid>
  );
}

export default PurchasePage;
