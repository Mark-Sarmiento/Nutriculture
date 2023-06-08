import React from 'react';
import { ResponsiveContainer } from 'recharts';
import ECplot from './content/ECplot';

const ECpage = () => {
  return (
    <div className=' m-auto chart-container'>
      <h1 className="pt-6 pl-4">Electric Conductivity</h1>
      <div className=" m-auto w-screen h-screen">
        <ResponsiveContainer width="100%" height="100%">
          <ECplot/>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ECpage;