package com.springproject.visium.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MonitorStatsDTO {
    private long currentResponseTimeMs;
    private double avgResponseTime24h;
    private double uptimePercentage;
    private double downtimePercentage;

    public MonitorStatsDTO(long currentResponseTimeMs, double avgResponseTime24h, double uptimePercentage, double downtimePercentage) {
        this.currentResponseTimeMs = currentResponseTimeMs;
        this.avgResponseTime24h = avgResponseTime24h;
        this.uptimePercentage = uptimePercentage;
        this.downtimePercentage = downtimePercentage;
    }
}