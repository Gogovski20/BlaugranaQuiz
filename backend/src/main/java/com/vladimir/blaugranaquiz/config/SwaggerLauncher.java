package com.vladimir.blaugranaquiz.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.awt.*;

@Component
public class SwaggerLauncher {
    @EventListener(ApplicationReadyEvent.class)
    public void openSwagger() {
        try {
            Runtime.getRuntime().exec(new String[]{"cmd", "/c", "start", "http://127.0.0.1:8080/swagger-ui/index.html"});
            System.out.println(">>> Swagger UI launched!");
        } catch (Exception e) {
            System.err.println("Could not open Swagger UI: " + e.getMessage());
        }
    }
}
