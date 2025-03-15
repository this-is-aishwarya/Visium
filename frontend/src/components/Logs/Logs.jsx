import { useEffect, useState } from "react";
import './Logs.css'

const Logs = ({ monitorId }) => {
    const [monitorLogs, setMonitorLogs] = useState({}); 

    useEffect(() => {
        if (!monitorId) return;

        if (!monitorLogs[monitorId]) {
            setMonitorLogs((prev) => ({ ...prev, [monitorId]: [] })); 
        }

        const eventSource = new EventSource(`http://localhost:8080/uptime/logs/stream/${monitorId}`);

        eventSource.onmessage = (event) => {
            const newLog = JSON.parse(event.data);
            setMonitorLogs((prev) => ({
                ...prev,
                [monitorId]: [newLog, ...(prev[monitorId] || [])].slice(0, 10), 
            }));
        };

        eventSource.onerror = () => {
            console.error(`SSE error for monitorId: ${monitorId}, closing connection...`);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [monitorId]);

    return (
        <div>
            <div className="logpanel">
                <div className="logs">
                    <div className="loghead">Last Checked</div>
                    <div className="loghead">Response Time (m)s</div>
                    <div className="loghead">Status</div>
                </div>
                {(monitorLogs[monitorId] || []).map((log, index) => (
                    <div className="logs">
                        <div className="logstat">{log.lastChecked.slice(0, -4)}</div>
                        <div className="logstat">{log.responseTimeMs}ms</div>
                        <div className="logstat">{log.status}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Logs;
