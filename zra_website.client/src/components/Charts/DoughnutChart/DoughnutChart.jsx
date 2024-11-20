import React from "react";
import {Doughnut} from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DoughnutChart = () => {
    const data = {
        labels: ["Synced Items 2024", "Failed Items 2024"],
        datasets: [
            {
                data: [300, 100],
                backgroundColor: ["#01a252", "#e81f23"],
                hoverBackgroundColor: ["#01a252", "#e81f23"],
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
                text: "Synced vs Failed Items (2024)",
                font: {
                    size: 20,
                }
            },
            datalabels: {
                color: '#fff',
                anchor: 'center',
                align: 'center',
                font: {
                    weight: 'bold',
                    size: 20,
                },
            },
        },
    };

    return (
        <div className="doughnut-container">
            <Doughnut data={data} options={options}/>
        </div>
    );
};

export default DoughnutChart;
