package com.springproject.visium.service;

import com.springproject.visium.dto.MonitorStatsDTO;
import com.springproject.visium.entity.MonitorLog;
import com.springproject.visium.repository.MonitorLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MonitorLogService {
    @Autowired
    private MonitorLogRepository logRepository;
    private final Map<String, List<SseEmitter>> emitters = new ConcurrentHashMap<>();

    public SseEmitter addEmitter(String monitorId) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.computeIfAbsent(monitorId, k -> new ArrayList<>()).add(emitter);

        emitter.onCompletion(() -> removeEmitter(monitorId, emitter));
        emitter.onTimeout(() -> removeEmitter(monitorId, emitter));
        emitter.onError((e) -> removeEmitter(monitorId, emitter));

        System.out.println("New SSE connection for monitorId: " + monitorId);
        return emitter;
    }

    public void sendLogUpdate(MonitorLog log) {
        String monitorId = log.getMonitorId();
        List<SseEmitter> monitorEmitters = emitters.getOrDefault(monitorId, new ArrayList<>());

        Iterator<SseEmitter> iterator = monitorEmitters.iterator();
        while (iterator.hasNext()) {
            SseEmitter emitter = iterator.next();
            try {
                emitter.send(SseEmitter.event().data(log));
            } catch (IOException e) {
                emitter.complete();
                iterator.remove(); // Remove inactive emitter
            }
        }
    }

    private void removeEmitter(String monitorId, SseEmitter emitter) {
        List<SseEmitter> emitterList = emitters.get(monitorId);
        if (emitterList != null) {
            emitterList.remove(emitter);
            if (emitterList.isEmpty()) {
                emitters.remove(monitorId); // Clean up if no emitters left
            }
        }
        System.out.println("SSE connection closed for monitorId: " + monitorId);
    }

    public MonitorStatsDTO getMonitorStats(String monitorId) {
        List<MonitorLog> logs = logRepository.findByMonitorIdAndLastCheckedAfter(monitorId, LocalDateTime.now().minusHours(24));

        if (logs.isEmpty()) {
            return new MonitorStatsDTO(0, 0, 0, 0);
        }

        long currentResponseTime = logs.get(0).getResponseTimeMs();
        double avgResponseTime = logs.stream().mapToLong(MonitorLog::getResponseTimeMs).average().orElse(0);

        long upCount = logs.stream().filter(log -> "UP".equals(log.getStatus())).count();
        long totalCount = logs.size();

        double uptimePercentage = (double) upCount / totalCount * 100;
        double downtimePercentage = 100 - uptimePercentage;

        return new MonitorStatsDTO(currentResponseTime, avgResponseTime, uptimePercentage, downtimePercentage);
    }
}
