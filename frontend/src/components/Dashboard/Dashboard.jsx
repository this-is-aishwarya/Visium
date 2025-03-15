import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Navbar from "../Navbar/Navbar";
import MonitorList from "../MonitorList/MonitorList"
import MonitorDetail from "../MonitorDetail/MonitorDetail"
import "./Dashboard.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { getAllMonitors } from "../../service/Api";
import Total from "../Logs/Total";

const Monitor = () => {
    const [data, setData] = useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [showForm, setShowForm] = useState(false);
    const [selectedMonitor, setSelectedMonitor] = useState(null);
    const handleListItemClick = (
        event,
        index,
        monitor
      ) => {
        setSelectedIndex(index);
        setSelectedMonitor(monitor);
        console.log(selectedMonitor);
      };

    const handleAddMonitor = () => {
        setShowForm(true);
    }

    const handleMonitorDeleted = () => {
        setSelectedMonitor(null);
    }

    const handlePopupClose = () => {
        setShowForm(false);
    }

    useEffect(() => {
        async function fetchAllMonitor(){
            const response = await getAllMonitors();
            if(response){
                setData(response);
            }
        }
        fetchAllMonitor();
    }, [])
    return (
        <div>
            <Navbar/>
            <div className="panel-container">
                <div className="addmonitorbtn">
                    <Button variant="contained" onClick={handleAddMonitor}>+ Add New Monitor</Button>
                </div>
                <div className="panel-containerdash">
                <div className="display-list">
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#39395c' }}>
                        {data && data.length > 0 &&
                            data.map((monitor, index) => (
                                <List component="nav"key={index}>
                                    <ListItemButton
                                        selected={selectedIndex === index}
                                        onClick={(event) => handleListItemClick(event, index, monitor)}
                                    >
                                        <div className={`status ${monitor.status.toLowerCase()}`}>{monitor.status}</div>
                                        <ListItemText primary={monitor.name} className="monitorName"/>
                                    </ListItemButton>
                                </List>
                            ))
                        }
                    </Box>
                </div>
                <div className="display-details">
                    { showForm &&
                        <MonitorList onClose={handlePopupClose}/>
                    }
                    {
                        selectedMonitor ?  
                        (<MonitorDetail monitor={selectedMonitor} onMonitorDeleted={handleMonitorDeleted}/>) :
                        (<Total totalStats={data}/>)
                    }
                </div>
                <div className="pad"></div>
            </div>
         </div>
        </div>
    );
};

export default Monitor;
