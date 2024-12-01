package com.springproject.visium.controller;

import com.springproject.visium.entity.Dashboard;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class EntryController {

    private Map<Long, Dashboard> dashboards = new HashMap<>();

    @GetMapping
    public List<Dashboard> getAll(){
        return new ArrayList<>(dashboards.values());
    }

    @PostMapping
    public Boolean createDashboard(@RequestBody Dashboard dashboardEntry){
        dashboards.put(dashboardEntry.getId(), dashboardEntry);
        return true;
    }

    @GetMapping("id/{dashId}")
    public Dashboard getDashboardById(@PathVariable Long dashId){
        return dashboards.get(dashId);
    }

    @DeleteMapping("id/{dashId}")
    public Dashboard deleteDashboardById(@PathVariable Long dashId){
        return dashboards.get(dashId);
    }

    @PutMapping("id/{dashId}")
    public Dashboard updateDashboardById(@PathVariable Long dashId, Dashboard dashboard){
        return dashboards.put(dashId, dashboard);
    }

}
