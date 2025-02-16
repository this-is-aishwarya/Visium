package com.springproject.visium.service;

import com.springproject.visium.controller.MonitorLogRepository;
import com.springproject.visium.entity.Monitor;
import com.springproject.visium.entity.MonitorLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Instant;
import java.time.LocalDateTime;

@Service
public class PingService {

    @Autowired
    private MonitorLogRepository monitorLogRepository;

    public void createMonitorLog(Monitor monitor){
        long startTime = System.currentTimeMillis();
        String status;
        String errorMessage = null;

        boolean isUp = pingURL(monitor.getUrl(), 5000);
        long responseTime = System.currentTimeMillis() - startTime;
        if(!isUp){
            status = "DOWN";
            errorMessage = "Failed to connect";
        }
        else if(responseTime > monitor.getResponseTimeThresholdMs()){
            status = "DEGRADED";
            errorMessage = "Respoonse timeout exceeded the threshold";
        }
        else{
            status = "UP";
        }
        monitor.setStatus(status);
        monitor.setLastChecked(LocalDateTime.now());

        MonitorLog newlog = new MonitorLog();
        newlog.setMonitorId(monitor.getId());
        newlog.setStatus(status);
        newlog.setUrl(monitor.getUrl());
        newlog.setResponseTimeMs(responseTime);
        newlog.setLastChecked(monitor.getLastChecked());
        newlog.setErrorMessage(errorMessage);
        monitorLogRepository.save(newlog);
    }

    public boolean pingURL(String url, int timeout) {
        HttpURLConnection connection = null;
        try {
            URL u = new URL(url);
            connection = (HttpURLConnection) u.openConnection();
            connection.setRequestMethod("HEAD");
            connection.setConnectTimeout(timeout);
            int code = connection.getResponseCode();
            System.out.println("" + code);
            return (200 <= code && code <= 399);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return false;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }
}