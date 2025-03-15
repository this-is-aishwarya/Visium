import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MonitorDetail.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteMonitor } from "../../service/Api";
import Logs from "../Logs/Logs";
import Downtime from "../Logs/Downtime";
import StatsPanel from "../Logs/StatsPanel";
import Total from "../Logs/Total";
import FiberSmartRecordIcon from '@mui/icons-material/FiberSmartRecord';
import DynamicLineChart from "../Chart/Chart";

const MonitorDetail = ({ monitor, onMonitorDeleted }) => {
    const navigate = useNavigate();
    if (!monitor) {
        return <p className="no-monitor"><Total mon={monitor}/></p>;
    }
    const formatDuration = (time) => {
        const seconds = Math.floor(time) % 60;
        const minutes = Math.floor(time / (60 )) % 60;
        const hours = Math.floor(time / (60 * 60)) % 24;
        const days = Math.floor(time / (60 * 60 * 60));

        let result = [];

        if (days > 0) result.push(`${days}d`);
        if (hours > 0) result.push(`${hours}h`);
        if (minutes > 0) result.push(`${minutes}m`);
        if (seconds % 60 > 0 || result.length === 0) result.push(`${seconds}s`);

        return result.join(" ");
    }
    console.log(monitor);
    const handleDelete = async () => {
        try {
            console.log(monitor.id);
            await deleteMonitor(monitor.id);
            alert("Monitor deleted successfully!");
            onMonitorDeleted();
            navigate("/dashboard");
        } catch (error) {
            console.error("Can't delete the monitor", error);
        }
    };

    return (
        <div>
            <div className="monitorheader">
                <div className="mondetails">
                    <div className="monitorTitle">{monitor.name}</div>
                    <div className="monitorUrl">
                        <a href={monitor.url} target="_blank" rel="noopener noreferrer">
                            {monitor.url}
                        </a>
                    </div>
                </div>
                <div className="monstatus">
                    <div className={`monstatus ${monitor.status.toLowerCase()}`}>{monitor.status}</div>
                </div>
            </div>
            <div className="actionbtn">
                <Button variant="contained" endIcon={<EditIcon />}>
                    Edit
                </Button>
                <Button variant="outlined" startIcon={<DeleteIcon />} color="error" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
            <div className="statustime">
                <div className="statustime">Checks every {formatDuration(monitor.intervalSeconds)}</div>
                <FiberSmartRecordIcon className="fibreicon"/>
            </div>
            <DynamicLineChart monitorId={monitor.id}/>
            <StatsPanel monitorId={monitor.id}/>
            <div className="logspanel">
                <Logs monitorId={monitor.id}/>
                <Downtime monitorId={monitor.id}/>
            </div>
        </div>
    );
};

export default MonitorDetail;
