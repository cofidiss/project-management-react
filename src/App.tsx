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
<Box
  bgcolor={"white"}
  sx={{
    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)', // Yumuşak kenar gölgesi
    borderRadius: 3, // Hafif köşe yumuşatma
    m: 2, // Dış boşluk
    p: 2, // İç boşluk
    transition: 'box-shadow 0.3s', // Smooth geçiş
  }}
>
  <Routes>
    <Route path="/add" element={<AddProject />} />
    <Route path="/FilterProject" element={<FilterProject />} />
  </Routes>
</Box>


  );
};
export default App;