package com.springproject.visium.controller;

import com.springproject.visium.entity.Monitor;
import com.springproject.visium.entity.MonitorLog;
import com.springproject.visium.service.MonitorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/monitor")
public class MonitorController {

    @Autowired
    private MonitorService monitorService;

    @PostMapping("/createMonitor")
    public ResponseEntity<String> createMonitor(@RequestBody Monitor monitorDetails){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userName = authentication.getName();
            monitorDetails.setUsername(userName);
            monitorService.createNewMonitor(monitorDetails);
            return new ResponseEntity<>("Monitor has been created", HttpStatus.OK);
        } catch (Exception e) {
            log.error(String.valueOf(e.getCause()));
            return new ResponseEntity<>("Incorrect details", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getAllMonitors")
    public List<Monitor> getAllMonitors(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        return monitorService.getAllMonitors(userName);
    }

    @GetMapping("/getAllMonitorLog/{monitorId}")
    public List<MonitorLog> getAllMonitorLog(@PathVariable String monitorId){
        SecurityContextHolder.getContext().getAuthentication();
        return monitorService.getMonitorLog(monitorId);
    }
}
