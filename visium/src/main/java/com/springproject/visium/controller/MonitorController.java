package com.springproject.visium.controller;

import com.springproject.visium.entity.Monitor;
import com.springproject.visium.entity.User;
import com.springproject.visium.service.MonitorService;
import com.springproject.visium.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Incorrect details", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getAllMonitors")
    public List<Monitor> getAllMonitors(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        return monitorService.getAllMonitors(userName);
    }
}
