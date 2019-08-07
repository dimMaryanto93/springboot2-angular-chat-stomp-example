package com.maryanto.dimas.example.controller;

import com.maryanto.dimas.example.entity.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.time.LocalDateTime;

@Controller
public class WebSocketController {

    @MessageMapping("/chat.start")
    @SendTo("/topic/greetings")
    public String halo(@Payload Message value) {
        return String.format(
                "hello from %s at %s",
                HtmlUtils.htmlEscape(value.getName()),
                LocalDateTime.now().toString()
        );
    }
}
