import React, { useEffect, useState } from 'react';
import { database } from '../../firebase'; // Update the import path
import { Line } from 'react-chartjs-2';

const RealtimeChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sensor Data',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  });

  useEffect(() => {
    const fetchData = () => {
      const databaseRef = database.ref('sensorData'); // Use the imported database object

      databaseRef.on('child_added', (snapshot) => {
        const data = snapshot.val();
        const newLabels = [...chartData.labels, data.Time];
        const newData = [...chartData.datasets[0].data, data.Value];

        setChartData({
          labels: newLabels,
          datasets: [
            {
              label: 'Sensor Data',
              data: newData,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
            },
          ],
        });
      });
    };

    fetchData();
  }, []);

  return <Line data={chartData} />;
};

export default RealtimeChart;
