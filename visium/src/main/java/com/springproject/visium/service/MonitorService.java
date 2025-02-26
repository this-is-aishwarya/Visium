package com.springproject.visium.service;

import com.springproject.visium.repository.MonitorLogRepository;
import com.springproject.visium.entity.Monitor;
import com.springproject.visium.entity.MonitorLog;
import com.springproject.visium.repository.MonitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class MonitorService {
    @Autowired
    private MonitorRepository monitorRepository;
    @Autowired
    private MonitorLogRepository monitorLogRepository;
    @Autowired
    private PingService pingService;

    public void createNewMonitor(Monitor monitor){
        monitorRepository.save(monitor);
        pingService.checkMonitor(monitor);
    }

    public List<Monitor> getAllMonitors(String username){
        return monitorRepository.findMonitorByUsername(username);
    }

    public List<MonitorLog> getMonitorLog(String monitorId){
        return monitorLogRepository.findAllByMonitorId(monitorId);
    }

    public void deleteMonitor(String monitorId){
         monitorRepository.deleteById(monitorId);
         monitorLogRepository.deleteByMonitorId(monitorId);
    }

    public List<MonitorLog> getLatestLogs(String monitorId){
        return monitorLogRepository.findTop10ByMonitorIdOrderByLastCheckedDesc(monitorId);
    }
}
