package com.maryanto.dimas.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import java.time.LocalDateTime;

@Slf4j
@RestController
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/private")
    public void halo(@Payload String value) {
        String data = String.format(
                "hello from %s at %s",
                HtmlUtils.htmlEscape(value),
                LocalDateTime.now().toString()
        );
        log.info("message: {}", data);
        this.template.convertAndSend("/chat/send", data);
    }
}
