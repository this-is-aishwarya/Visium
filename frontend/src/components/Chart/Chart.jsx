import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getAllMonitorLogs } from "../../service/Api";

Chart.register(...registerables);

const DynamicLineChart = ({ monitorId }) => {
    const [chartData, setChartData] = useState({});
    const eventSourceRef = useRef(null);

    useEffect(() => {
        if (!monitorId) return;

        const fetchData = async () => {
            try {
                const data = await getAllMonitorLogs(monitorId);

                if (Array.isArray(data)) {
                    const slicedData = data.slice(-100); // Keep last 100 logs

                    setChartData((prevData) => ({
                        ...prevData,
                        [monitorId]: {
                            labels: slicedData.map((log) => new Date(log.lastChecked).toLocaleTimeString()),
                            datasets: [
                                {
                                    label: "Response Time (ms)",
                                    data: slicedData.map((log) => log.responseTimeMs),
                                    borderColor: "rgba(75,192,192,1)",
                                    fill: false,
                                },
                            ],
                        },
                    }));
                }
            } catch (error) {
                console.error(`Error fetching data for monitor ${monitorId}:`, error);
            }
        };

        fetchData();
    }, [monitorId]);

    useEffect(() => {
        if (!monitorId) return;

        if (eventSourceRef.current) {
            eventSourceRef.current.close(); 
        }

        eventSourceRef.current = new EventSource(`http://localhost:8080/uptime/logs/stream/${monitorId}`);

        eventSourceRef.current.onmessage = (event) => {
            const newEvent = JSON.parse(event.data);
            const newTimestamp = new Date(newEvent.lastChecked).toLocaleTimeString();
            const newResponseTime = newEvent.responseTimeMs;

            setChartData((prevData) => {
                const prevMonitorData = prevData[monitorId] || { labels: [], datasets: [{ data: [] }] };

                return {
                    ...prevData,
                    [monitorId]: {
                        labels: [...prevMonitorData.labels, newTimestamp].slice(-100),
                        datasets: [
                            {
                                ...prevMonitorData.datasets[0],
                                data: [...prevMonitorData.datasets[0].data, newResponseTime].slice(-100),
                            },
                        ],
                    },
                };
            });
        };

        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, [monitorId]);

    return (
        <div>
            {chartData[monitorId] ? <Line data={chartData[monitorId]} /> : <p>Loading data...</p>}
        </div>
    );
};

export default DynamicLineChart;
