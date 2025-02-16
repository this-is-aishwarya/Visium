package com.springproject.visium.service;

import com.springproject.visium.entity.Monitor;
import com.springproject.visium.repository.MonitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MonitorService {
    @Autowired
    private MonitorRepository monitorRepository;
    @Autowired
    private PingService pingService;

    public void createNewMonitor(Monitor monitor){
        pingService.createMonitorLog(monitor);
        monitorRepository.save(monitor);
    }

    public List<Monitor> getAllMonitors(String username){
        return monitorRepository.findMonitorByUsername(username);
    }
}
