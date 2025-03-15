import { useState } from "react";
import './Total.css'

const Total = ({totalStats}) => {
    const [totalData, setTotalData] = useState({
        total: 0,
        totalup: 0,
        totaldown: 0
    });

    if(!totalStats){
        console.log(totalStats);
    }
    return(
        <div>
            <h1>Quick Stats</h1>
            <div className="quickstats">
                <div className="stat">
                    <div className="sthead">Total</div>
                    <div className="statbody total">{totalData.total}</div>
                </div>
                <div className="stat">
                    <div className="sthead">Uptime</div>
                    <div className="statbody totalup">{totalData.totalup}</div>
                </div>
                <div className="stat">
                    <div className="sthead">Downtime</div>
                    <div className="statbody totaldown">{totalData.totaldown}</div>
                </div>
            </div>
        </div>
    );
}

export default Total;