import React from "react";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = () => {
    const data = {
        labels: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ],
        datasets: [
            {
                label: "Processed Invoices 2024",
                data: [120, 150, 180, 200, 170, 220, 190, 210, 230, 240, 180, 160],
                borderColor: "rgb(1, 162, 82)",
                backgroundColor: "rgb(1, 162, 82)",
                fill: true,
            },
            {
                label: "Failed Invoices 2024",
                data: [30, 40, 50, 45, 60, 55, 65, 50, 70, 60, 40, 35],
                borderColor: "rgb(232, 31, 35)",
                backgroundColor: "rgb(232, 31, 35)",
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        size: 16,
                    },
                },
            },
            title: {
                display: true,
                text: "Processed vs Failed Invoices Over Time (2024)",
                font: {
                    size: 20,
                },
            },
            datalabels: {
                color: '#000',
                anchor: 'center',
                align: 'center',
                font: {
                    weight: 'bolder',
                    size: 15,
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    return <Line data={data} options={options} className="line-chart"/>;
};

export default LineChart;
