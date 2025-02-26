package com.springproject.visium.service;

import com.springproject.visium.repository.MonitorLogRepository;
import com.springproject.visium.entity.Monitor;
import com.springproject.visium.entity.MonitorLog;
import com.springproject.visium.repository.MonitorRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;

@Slf4j
@Service
public class PingService {

    @Autowired
    private MonitorLogRepository monitorLogRepository;
    @Autowired
    private MonitorRepository monitorRepository;
    @Autowired
    private TaskScheduler taskScheduler;
    @Autowired
    private MonitorLogService monitorLogService;

    private ConcurrentHashMap<String, ScheduledFuture<?>> scheduledTasks = new ConcurrentHashMap<>();

    public void initializeMonitoring() {
        List<Monitor> monitors = monitorRepository.findAll();
        for (Monitor monitor : monitors) {
            scheduleMonitor(monitor);
        }
    }

    public void scheduleMonitor(Monitor monitor) {
        // Cancel existing schedule if it exists
        if (scheduledTasks.containsKey(monitor.getId())) {
            scheduledTasks.get(monitor.getId()).cancel(false);
        }

        Runnable task = () -> checkMonitor(monitor);

        // Schedule the task with intervalSeconds
        ScheduledFuture<?> future = taskScheduler.scheduleAtFixedRate(task, Instant.now(), Duration.ofMillis(monitor.getIntervalSeconds() * 1000L));
        scheduledTasks.put(monitor.getId(), future);
    }


    public void checkMonitor(Monitor monitor){
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
            errorMessage = "Response timeout exceeded the threshold";
        }
        else{
            status = "UP";
        }
        log.info("Status and error {} and {}",status, errorMessage);
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
        monitorLogService.sendLogUpdate(newlog);
    }

    public boolean pingURL(String url, int timeout) {
        HttpURLConnection connection = null;
        try {
            URL u = new URL(url);
            log.info("Checking for url {}", url);
            connection = (HttpURLConnection) u.openConnection();
            connection.setRequestMethod("HEAD");
            connection.setConnectTimeout(timeout);
            int code = connection.getResponseCode();
            log.info("Status code received {}", code);
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