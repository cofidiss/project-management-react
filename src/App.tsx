import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import Navbar from './components/Navbar/Navbar';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';
import FilterProject from './components/Project/FilterProject';
const App: React.FC = () => {
  console.log('App renderer');
  return (
<Box bgcolor={"white"}>
           <Routes>
        <Route path="/add" element={<AddProject  />} />
                <Route path="/FilterProject" element={<FilterProject    />} />
      </Routes> 
</Box>


  );
};
export default App;