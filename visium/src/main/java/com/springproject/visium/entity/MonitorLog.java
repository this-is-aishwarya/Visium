package com.springproject.visium.entity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "monitorlog")
@Getter
@Setter
public class MonitorLog {

    @Id
    private Long id;
    private Monitor monitor;
    private String status;
    private int responseTimeMs;
    private String errorMessage;
    private LocalDateTime timestamp;
}
