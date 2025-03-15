import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MonitorList.css";
import { createMonitor } from "../../service/Api";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
 
const MonitorList = ({ onClose }) => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(true);
    const [monitorData, setMonitorData] = useState({
        name: "",
        url: "",
        expectedStatusCode: 200,
        responseTimeThresholdMs: 1000,
        monitorType: "HTTP",
        intervalSeconds: 60
    });

    const handleClosePopup = () => {
        setShowPopup(false);
        setMonitorData({ 
            name: "",
            url: "",
            expectedStatusCode: 200,
            responseTimeThresholdMs: 1000,
            monitorType: "HTTP",
            intervalSeconds: 60
        });
        onClose();
        navigate("/dashboard");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMonitorData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await createMonitor(monitorData);
            console.log("Monitor added:", response);
            alert("Monitor added successfully!");
            handleClosePopup();
            navigate("/");
        } catch (error) {
            console.error("Unauthorised. Returning to login", error);
        }
    };
    return(
        <div>
            {showPopup && (
                <div className="popup-overlay">
                    <div class="formcontainer">
                <div className="titlecontainer">
                <div class="close"><button onClick={handleClosePopup}>X</button></div>
                <div class="title">Add New Monitor</div>                
                </div>
                <form action="#">
                  <div class="formdetails">
                    <div class="input__box">
                      <span class="details">Monitor Name</span>
                      <TextField
                        required
                        id="name"
                        label="Required"
                        color="success"
                        name="name"
                        value={monitorData.name}
                        onChange={handleChange}
                        sx={{
                            width: '100%',
                            height: '10%'
                          }}
                        />
                    </div>
                    <div class="input__box">
                      <span class="details">URL</span>
                      <TextField
                        required
                        id="url"
                        label="Required"
                        name="url"
                        value={monitorData.url}
                        onChange={handleChange}
                        sx={{
                            width: '100%',
                            height: '10%'
                          }}
                        />
                    </div>
                    <div class="input__box">
                      <span class="details">Expected Status Code</span>
                      <TextField
                        required
                        id="expectedStatusCode"
                        label="Required"
                        name="expectedStatusCode"
                        value={monitorData.expectedStatusCode}
                        onChange={handleChange}
                        sx={{
                            width: '100%',
                            height: '10%'
                          }}
                        />
                    </div>
                    <div class="input__box">
                      <span class="details">Response Time Threshold(ms)</span>
                      <TextField
                        required
                        id="responseTimeThresholdMs"
                        label="Required"
                        name="responseTimeThresholdMs"
                        value={monitorData.responseTimeThresholdMs}
                        onChange={handleChange}
                        sx={{
                            width: '100%',
                            height: '10%'
                          }}
                        />
                    </div>
                    <div class="input__box">
                      <span class="details">Monitor Type</span>
                      <TextField
                        id="monitorType"
                        select
                        name="monitorType"
                        value={monitorData.monitorType}
                        onChange={handleChange}
                        variant="filled"
                        sx={{
                            width: '100%',
                            height: '45px'
                          }}
                        >
                            <MenuItem value="HTTP">HTTP</MenuItem>
                            <MenuItem value="TCP">TCP</MenuItem>
                            <MenuItem value="Ping">Ping</MenuItem>
                        </TextField>
                    </div>
                    <div class="input__box">
                      <span class="details">Interval(s)</span>
                      <TextField
                        required
                        id="intervalSeconds"
                        label="Required"
                        name="intervalSeconds"
                        value={monitorData.intervalSeconds}
                        onChange={handleChange}
                        sx={{
                            width: '100%',
                            height: '10%'
                          }}
                        />
                    </div>
              
                  </div>
                  <div class="button">
                    <input type="submit" value="Add" onClick={handleSubmit}/>
                  </div>
                </form>
                </div>
                </div>
                
            )}
        </div>
    )
}

export default MonitorList;