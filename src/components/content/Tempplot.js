import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { database } from '../../firebase';
import { ref, onValue } from "firebase/database";
import { UserAuth } from '../../context/AuthContext';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="label">Time: {dataPoint.time}</p>
        <p className="label">Value: {dataPoint.value}</p>
      </div>
    );
  }
  return null;
};

const Tempplot = () => {
  const { user } = UserAuth();
  const [data, setData] = useState([]);

  const MAX_DATA_CHART = 10;

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/Temp`);
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
      });
    };

    fetchData();
  }, [user?.uid]);

  return (
    <>
        <h3>Temperature Graph</h3>
        <LineChart width={500} height={300} data={data}>
            <XAxis dataKey="time" domain={[0, "dataMax"]} />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="value" stroke="#8884d8" isAnimationActive={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
        </LineChart>
        <p>{[data.value]}</p>
    </>
  );
};

export default Tempplot;
