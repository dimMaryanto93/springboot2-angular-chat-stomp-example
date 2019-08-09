package com.maryanto.dimas.example.controller;

import com.maryanto.dimas.example.entity.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class WebSocketController {

    @MessageMapping("/private")
    @SendTo("/chat/send")
    public Message halo(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
        log.info("received: {}", message);
        return message;
    }
}
