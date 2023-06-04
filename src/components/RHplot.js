import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { database } from '../firebase';
import { ref, onValue } from "firebase/database";
import { UserAuth } from '../context/AuthContext';

const MyChartComponent = () => {
  const { user } = UserAuth();
  const [data, setData] = useState([]);

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
            if (counter >= 10) {
              chartData.shift();
            }
          }
        }

        setData(chartData);
      });
    };

    fetchData();
  }, [user]);

  return (
    <LineChart width={500} height={300} data={data} >
      <XAxis dataKey="time" domain={[0, "dataMax"]} />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="value" stroke="#8884d8" isAnimationActive={false} />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

export default MyChartComponent;
