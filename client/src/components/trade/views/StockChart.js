import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale} from 'chart.js';
import 'chartjs-adapter-date-fns';
import styles from '../styles/StockChart.module.css';

// Register the required components for line charts
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
);

const StockChart = () => {
    const { stockName } = useParams(); // useParams 훅을 사용하여 URL에서 stockName을 가져옴
    const [realtimeData, setRealtimeData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [showRealtime, setShowRealtime] = useState(false);
    const [volumeData, setVolumeData] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(null);

    const isWithinTradingHours = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return (hours > 9 || (hours === 9 && minutes >= 0)) && (hours < 15 || (hours === 15 && minutes < 30));
    };

    const fetchRealtimeData = async () => {
        try {
            // console.log("realtime에 들어온 stockname:",stockName)
            const response = await axios.post('http://localhost:8000/trade/stock-info/', { stock_name: stockName });
            const price = parseFloat(response.data.current_price.replace(/,/g, ''));
            setCurrentPrice(price);
            // console.log("실시간 : ", response.data)
            const data = {
                date: new Date(),
                price
            };
            setRealtimeData(prevData => {
                const newData = [...prevData, data];
                if (newData.length > 60) {
                    newData.shift();
                }
                // console.log("업데이트된 실시간 데이터:", newData);
                return newData;
            });
        } catch (error) {
            console.log("실시간 데이터를 가져오는 중 에러 발생:", error);
        }
    };

    const fetchDailyData = async () => {
        try {
            const response = await axios.post('http://localhost:8000/trade/stock-daily/', { stock_name: stockName });
            const dailyData = response.data.map(day => ({
                x: new Date(day.date),
                y: [parseFloat(day.open), parseFloat(day.high), parseFloat(day.low), parseFloat(day.close)]
            }));
            const volumeData = response.data.map(day => ({
                x: new Date(day.date),
                y: parseFloat(day.volume)
            }));
            setDailyData(dailyData);
            setVolumeData(volumeData);
        } catch (error) {
            console.log("일봉 데이터를 가져오는 중 에러 발생:", error);
        }
    };

    useEffect(() => {
        setRealtimeData([]); // Reset the realtime data when stockName changes
        // 최초 한 번 데이터 가져오기
        fetchRealtimeData();
        // 이후부터는 거래 시간에 따라 데이터를 요청
        const interval = setInterval(() => {
            if (isWithinTradingHours()) {
                fetchRealtimeData();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [stockName]);

    useEffect(() => {
        fetchDailyData();
    }, [stockName]);

    const handleShowRealtime = () => {
        setShowRealtime(true);
    };

    const handleShowDaily = () => {
        setShowRealtime(false);
        fetchDailyData();
    };

    const realtimeChartData = {
        labels: realtimeData.map(point => point.date.toLocaleTimeString()),
        datasets: [
            {
                label: '현재가',
                data: realtimeData.map(point => point.price),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                tension: 0,
            },
        ],
    };

    // console.log("리얼타임",realtimeChartData);

    const commonXAxisOptions = {
        type: 'datetime',
        labels: {
            formatter: function (val) {
                const date = new Date(val);
                return `${date.getMonth() + 1}/${date.getDate()}`;  // Changed format to "MM/DD"
            },
            style: {
                colors: '#000'
            }
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    };

    const candlestickChartOptions = {
        chart: {
            type: 'candlestick',
            height: 500,  // Increased height
            width: '100%',  // Full width
            toolbar: {
                tools: {},
            },
            background: 'transparent',
            animations: {
                enabled: false  // Disable animations
            },
            zoom: {
                enabled: true,
                autoScaleYaxis: true
            }
        },
        grid: {
            show: false,
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#FF0000', 
                    downward: '#0080FF' 
                },
                wick: {
                    useFillColor: true,
                },
            },
        },
        xaxis: commonXAxisOptions,
        yaxis: {
            show: false,
        },
        tooltip: {
            y: {
                formatter: (value) => value !== null ? `$ ${value.toFixed(2)}` : '',
            },
            x: {
                formatter: (val) => {
                    const date = new Date(val);
                    return `${date.getMonth() + 1}/${date.getDate()}`;  // Changed format to "MM/DD"
                }
            }
        },
        title: {
            text: stockName,
            align: 'center',
            style: {
                fontSize: '16px',
                fontWeight: 'bold'
            }
        }
    };

    const volumeChartOptions = {
        chart: {
            type: 'bar',
            height: 200,
            width: '100%',
            toolbar: {
                tools: {},
            },
            background: 'transparent',
            animations: {
                enabled: false
            },
            zoom: {
                enabled: true,
                autoScaleYaxis: true
            }
        },
        grid: {
            show: false,
        },
        xaxis: commonXAxisOptions,
        yaxis: {
            show: false,
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: false, // Disable data labels on bars
        },
    };

    const lineChartOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'category',
                labels: realtimeData.map(point => point.date.toLocaleTimeString()), // Use time labels
                ticks: {
                    source: 'auto'
                }
            },
            y: {
                min: currentPrice ? currentPrice - 500 : undefined,
                max: currentPrice ? currentPrice + 500 : undefined,
                ticks: {
                    stepSize: 100 
                },
                position: 'right'
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: stockName,
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    top:8,
                    bottom: 15
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: false
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
    };

    return (
        <div className={styles.chart}>
            <div>
                <div className={styles.btn_div}>
                    <button onClick={handleShowRealtime} className={styles.line}>라인차트</button>
                    <button onClick={handleShowDaily} className={styles.candle}>캔들차트</button>
                </div>
                {showRealtime ? (
                    <Line options={lineChartOptions} data={realtimeChartData}/>
                ) : (
                    <>
                        <Chart 
                            options={candlestickChartOptions} 
                            series={[
                                { 
                                    name: 'Candlestick', 
                                    type: 'candlestick', 
                                    data: dailyData
                                }
                            ]} 
                            type="candlestick" 
                            height={400}
                        />
                        <div style={{ height: '20px', borderBottom: '1px solid #000', marginBottom: '20px' }}></div>
                        <Chart 
                            options={volumeChartOptions} 
                            series={[
                                { 
                                    name: 'Volume', 
                                    type: 'bar', 
                                    data: volumeData
                                }
                            ]} 
                            type="bar" 
                            height={200}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default StockChart;
