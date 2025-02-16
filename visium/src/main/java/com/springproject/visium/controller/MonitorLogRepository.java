package com.springproject.visium.controller;

import com.springproject.visium.entity.MonitorLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonitorLogRepository extends MongoRepository<MonitorLog, String> {
    public List<MonitorLog> findAllByMonitorId(String monitorId);
}
