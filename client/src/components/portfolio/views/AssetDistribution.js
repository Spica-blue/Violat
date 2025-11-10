import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

export default function AssetDistribution({ accountNum }) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/portfolio/distribution/${accountNum}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    const labels = data.map(item => `Stock ${item.stock_code}`);
                    const values = data.map(item => item.stock_percentage);

                    setChartData({
                        labels: labels,
                        datasets: [{
                            data: values,
                            backgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56',
                                '#4BC0C0',
                                '#9966FF',
                                '#FF9F40'
                            ]
                        }]
                    });
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching asset distribution data:', error);
            });
    }, [accountNum]);

    return (
        <div>
            <h2>Asset Distribution</h2>
            {chartData && <Pie data={chartData} />}
        </div>
    );
}
