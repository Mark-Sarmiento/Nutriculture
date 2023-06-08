import React, { useEffect, useState } from 'react';
import { database } from '../../firebase'; // Update the import path
import { ref, onValue } from 'firebase/database';
import { Line } from 'react-chartjs-2';
import { UserAuth } from '../../context/AuthContext';
import { Chart, CategoryScale } from 'chart.js';

const RHchart = () => {
  const MAX_DATA_CHART = 10; // Adjust the maximum number of data points to display
  const { user } = UserAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/EC`); // Update the database reference path

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

  useEffect(() => {
    Chart.register(CategoryScale); // Register the CategoryScale

    return () => {
      Chart.unregister(CategoryScale); // Unregister the CategoryScale when the component unmounts
    };
  }, []);

  // Convert the fetched data to the format expected by the chart library
  const chartData = {
    labels: data.map((entry) => entry.time),
    datasets: [
      {
        label: 'Sensor Data',
        data: data.map((entry) => entry.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default RHchart;
