package com.springproject.visium.repository;

import com.springproject.visium.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

@Component
public interface UserRepository extends MongoRepository<User, String> {
    public User findByUsername(String username);
    public User deleteByUsername(String username);
}
