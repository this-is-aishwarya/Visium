package com.springproject.visium.controller;

import com.springproject.visium.entity.User;
import com.springproject.visium.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private UserService userService;

    @GetMapping("/ping")
    public String ping(){
        return "Visium is up";
    }

    @PostMapping("/signup")
    public String createUser(@RequestBody User user){
        userService.saveEntry(user);
        return "User has been created";
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user){
        userService.saveEntry(user);
        return "User has been created";
    }
}
