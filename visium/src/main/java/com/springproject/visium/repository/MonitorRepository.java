package com.springproject.visium.repository;

import com.springproject.visium.entity.Monitor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonitorRepository extends MongoRepository<Monitor, String> {
    public List<Monitor> findMonitorByUsername(String username);
    public Monitor findMonitorById(String id);
    public void deleteById(String id);
}
