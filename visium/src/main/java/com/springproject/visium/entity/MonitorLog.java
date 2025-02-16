package com.springproject.visium.entity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Document(collection = "monitorlog")
@Getter
@Setter
public class MonitorLog {

    @Id
    private String id;
    private String monitorId;
    private String url;
    private String status;
    private long responseTimeMs;
    private String errorMessage;
    private LocalDateTime lastChecked;
}
