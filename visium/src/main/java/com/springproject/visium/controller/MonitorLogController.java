package com.springproject.visium.controller;

import com.springproject.visium.dto.MonitorStatsDTO;
import com.springproject.visium.service.MonitorLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/logs")
public class MonitorLogController {

    @Autowired
    private MonitorLogService logService;

    @GetMapping(value = "/stream/{monitorId}", produces = "text/event-stream")
    public SseEmitter streamLogs(@PathVariable String monitorId) {
        System.out.println("SSE Connection Established for Monitor ID: " + monitorId);
        return logService.addEmitter(monitorId);
    }

    @GetMapping("/stats/{monitorId}")
    public MonitorStatsDTO getMonitorStats(@PathVariable String monitorId) {
        return logService.getMonitorStats(monitorId);
    }
}
