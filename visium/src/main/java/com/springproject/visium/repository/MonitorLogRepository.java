package com.springproject.visium.repository;

import com.springproject.visium.entity.MonitorLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MonitorLogRepository extends MongoRepository<MonitorLog, String> {
    public List<MonitorLog> findAllByMonitorId(String monitorId);
    public List<MonitorLog> findTop10ByMonitorIdOrderByLastCheckedDesc(String monitorId);
    public void deleteByMonitorId(String monitorId);
    List<MonitorLog> findByMonitorIdAndLastCheckedAfter(String monitorId, LocalDateTime lastChecked);
}