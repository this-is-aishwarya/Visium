package com.springproject.visium.controller;

import com.springproject.visium.entity.Monitor;
import com.springproject.visium.entity.User;
import com.springproject.visium.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/monitor")
public class MonitorController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userName}")
    public List<Monitor> updateUser(@PathVariable String userName){
        return null;
    }
}
