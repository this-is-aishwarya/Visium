import { useEffect, useState } from "react";
import "./StatsPanel.css";
import { getStats } from "../../service/Api";

const StatsPanel = ({ monitorId }) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (!monitorId) return;
        
        async function fetchStats(){
            const response = await getStats(monitorId);
            if(response){
                setStats(response);
            }
        }
        fetchStats(monitorId);
        const interval = setInterval(() => fetchStats(), 60000);

        return () => clearInterval(interval);
    }, [monitorId]);

    if (!stats) return <p>Loading stats...</p>;

    return (
        <div className="responsepanel">
            <div className="stats">
                <div className="stathead">Response</div>
                <div className="statbody">{stats.currentResponseTimeMs} ms</div>
            </div>
            <div className="stats">
                <div className="stathead">Avg. Response</div>
                <div className="statbody">{stats.avgResponseTime24h.toFixed(2)} ms</div>
            </div>
            <div className="stats">
                <div className="stathead">Uptime</div>
                <div className="statbody">{stats.uptimePercentage.toFixed(2)}%</div>
            </div>
            <div className="stats">
                <div className="stathead">Downtime</div>
                <div className="statbody">{stats.downtimePercentage.toFixed(2)}%</div>
            </div>
        </div>
    );
};

export default StatsPanel;
