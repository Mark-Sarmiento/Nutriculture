import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard'
import AddUnit from './pages/AddUnit'
import Sidebar from './components/Sidebar';
import Tempplot from './components/content/Tempplot';
import RHpage from './components/RHpage';
import './app.css'
import ECpage from './components/ECpage';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/signin' element={<Signin />} />
        </Routes>

        <Sidebar>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/dashboard" element={<Protected> <Dashboard/> </Protected>}/>
            <Route path="/addunit" element={<Protected> <AddUnit/> </Protected>}/>
            <Route path="/sensors/humidity" element={<Protected> <RHpage/> </Protected>}/>
            <Route path="/sensors/temperature" element={<Protected> <Tempplot/> </Protected>}/>
            <Route path="/sensors/ECsensor" element={<Protected> <ECpage/> </Protected>}/>
            
          </Routes>
        </Sidebar>
        
      </AuthContextProvider>
    </div>
  );
}

export default App;