import React from 'react';
import { AlertManager } from './Components/AlertManager';
import { Typography } from '@mui/material';


function App() {

  return (
    <>
      <Typography variant="h5" >CloudPareto Alert(s) Dashboard</Typography>
      <AlertManager />
      </>
  );
}

export default App;
