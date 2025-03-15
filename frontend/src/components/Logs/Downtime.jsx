import { useEffect, useState } from "react";
import "./Downtime.css";
import { getDowntime } from "../../service/Api";

const Downtime = ({ monitorId }) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (!monitorId) return;
        
        async function fetchStats(){
            const response = await getDowntime(monitorId);
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
        <div className="downtimepanel">
                Last Downtime Reported
                <div className="downtimepan">
                    {(stats|| []).map((log, index) => (
                        <div className="downtimerow">
                            <div className="downstat">{log.lastChecked.slice(0, -4)}</div>
                        </div>
                    ))}
                </div>
                
        </div>
    );
};

export default Downtime;
