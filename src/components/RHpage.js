import React from 'react';
import RHplot from './content/RHplot';
import { ResponsiveContainer } from 'recharts';

const RHpage = () => {
  return (
    <div>
      <h1 className="pt-6 pl-4">Relative Humidity Graph</h1>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RHplot />
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RHpage;
