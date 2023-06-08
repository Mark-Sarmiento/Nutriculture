import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard'
import AddUnit from './pages/AddUnit'
import Sidebar from './components/Sidebar';
import RHpage from './components/RHpage';
import './app.css'
import ECpage from './components/ECpage';
import Temppage from './components/Temppage';

function App() {
  return (
    <div className='h-screen overflow-y-hidden'>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
        </Routes>

        <Sidebar>
          <Routes>
            <Route path="/dashboard" element={<Protected> <Dashboard/> </Protected>}/>
            <Route path="/addunit" element={<Protected> <AddUnit/> </Protected>}/>
            <Route path="/sensors/humidity" element={<Protected> <RHpage/> </Protected>}/>
            <Route path="/sensors/temperature" element={<Protected> <Temppage/> </Protected>}/>
            <Route path="/sensors/ECsensor" element={<Protected> <ECpage/> </Protected>}/>
            
          </Routes>
        </Sidebar>
        
      </AuthContextProvider>
    </div>
  );
}

export default App;