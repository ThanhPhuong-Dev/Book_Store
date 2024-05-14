import React from 'react';
import { Button, Typography } from '@mui/material';
function BaseButton({ label, type }) {
  return (
    <Button type={type} className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 h-[40px]">
      <Typography className="text-base text-white !font-bold">{label}</Typography>
    </Button>
  );
}

export default BaseButton;
