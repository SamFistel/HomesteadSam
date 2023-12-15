import React from "react";
import Chart from "chart.js/auto";
import { Line } from 'react-chartjs-2';

const LineChart = (stats) => {

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Speed Vs Laps',
                data: [12, 10, 3, 5, 2],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    // console.log(stats.data)
    return <Line data={data} options={options} />;
};

export default LineChart;