package com.springproject.visium.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "monitor")
@Data
@Getter
@Setter
public class Monitor {
    private String id;
    private String username;
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
