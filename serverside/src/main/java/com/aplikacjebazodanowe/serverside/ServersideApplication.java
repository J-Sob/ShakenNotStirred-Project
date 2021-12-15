package com.aplikacjebazodanowe.serverside;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ServersideApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServersideApplication.class, args);
	}

}
