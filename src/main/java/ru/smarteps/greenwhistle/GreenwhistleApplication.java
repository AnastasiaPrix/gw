package ru.smarteps.greenwhistle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityDataConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
@EnableAutoConfiguration(exclude = {
        SecurityAutoConfiguration.class
        })
@SpringBootApplication
public class GreenwhistleApplication {

	public static void main(String[] args) {
		SpringApplication.run(GreenwhistleApplication.class, args);
	}
}
