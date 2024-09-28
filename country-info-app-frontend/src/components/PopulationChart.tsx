import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationChart = ({ countries }: any) => {
  const data = {
    labels: countries.map((country: any) => country.name.common),
    datasets: [
      {
        label: 'Population',
        data: countries.map((country: any) => country.population),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
};

export default PopulationChart;
