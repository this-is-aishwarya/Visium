package com.springproject.visium;

import com.springproject.visium.service.PingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableAutoConfiguration
public class VisiumApplication {

	@Autowired
	private PingService pingService;

	public static void main(String[] args) {
		SpringApplication.run(VisiumApplication.class, args);
	}

	@Bean
	public ApplicationRunner startupRunner() {
		return args -> pingService.initializeMonitoring();
	}

}
