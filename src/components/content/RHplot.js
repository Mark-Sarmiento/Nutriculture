import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { database } from '../../firebase';
import { ref, onValue } from "firebase/database";
import { UserAuth } from '../../context/AuthContext';
import DashboardBox from "./DashboardBox";


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-white rounded p-2">
        <p className="text-gray-800 font-medium">Time: {dataPoint.time}</p>
        <p className="text-gray-800 font-medium">Value: {dataPoint.value}</p>
      </div>
    );
  }
  return null;
};

const RHplot = () => {
  const { user } = UserAuth();
  const [data, setData] = useState([]);
  const [color, setColor] = useState("#8884d8");
  const [areaColor, setAreaColor] = useState("url(#colorValue)");

  const MAX_DATA_CHART = 20;

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/RH`);
      onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];

        let counter = 0;
        for (let key in firebaseData) {
          if (firebaseData.hasOwnProperty(key)) {
            chartData.push({
              name: key,
              value: firebaseData[key].Value,
              time: firebaseData[key].Time,
            });
            counter++;

            // Limit the number of data points to display
            if (counter >= MAX_DATA_CHART) {
              chartData.shift();
            }
          }
        }

        setData(chartData);

        // Check the latest fetched data and update the color accordingly
        const latestValue = chartData[chartData.length - 1]?.value;
        if (latestValue < 50) {
          setColor("red"); // Change the line color to red if the latest value is below 50
          setAreaColor("url(#colorValueRed)"); // Change the area color to red gradient if the latest value is below 50
        } else {
          setColor("#8884d8"); // Reset the line color to the default if the latest value is 50 or above
          setAreaColor("url(#colorValue)"); // Reset the area color to the default gradient if the latest value is 50 or above
        }
      });
    };

    fetchData();
  }, [user?.uid]);

  return (
    <div className="">
      <p></p>
      <DashboardBox gridArea="15">
        <ResponsiveContainer  width="100%" height={300}>
          <AreaChart data={data}
           margin={{
            top: 15,
            right: 25,
            left: -10,
            bottom: 60,
          }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorValueRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                <stop offset="95%" stopColor="red" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" domain={[0, "dataMax"]}  />
            <YAxis  />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="linear" dataKey="value" stroke={color} fillOpacity={1} fill={areaColor} isAnimationActive={false}/>
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <p>{[data.value]}</p>
    </div>
  );
};

export default RHplot;