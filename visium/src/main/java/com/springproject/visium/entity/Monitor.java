package com.springproject.visium.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "monitor")
public class Monitor {
    private String id;
    private User user_id;
    private String name;
    private String url;
    private int expectedStatusCode;
    private int responseTimeThresholdMs;
    private String monitorType;
    private int intervalSeconds;

    private String status; // "UP", "DOWN", "UNKNOWN"
    private LocalDateTime lastChecked;
    private List<MonitorLog> logs = new ArrayList<>();
}
