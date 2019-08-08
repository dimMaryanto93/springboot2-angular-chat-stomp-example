package com.maryanto.dimas.example.controller;

import com.maryanto.dimas.example.entity.Message;
import com.maryanto.dimas.example.entity.OutputMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Slf4j
@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/private")
    @SendTo("/chat/send")
    public OutputMessage halo(
            @Payload Message message,
            SimpMessageHeaderAccessor headerAccessor) {
        log.info("received: {}", message);
        OutputMessage output = new OutputMessage(
                message.getMessage(),
                message.getFrom(),
                Timestamp.valueOf(LocalDateTime.now()));
        headerAccessor.getSessionAttributes().put("username", message.getFrom());
        return output;
    }
}
