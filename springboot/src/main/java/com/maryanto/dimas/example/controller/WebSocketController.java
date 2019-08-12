package com.maryanto.dimas.example.controller;

import com.maryanto.dimas.example.dto.MessageDTO;
import com.maryanto.dimas.example.entity.Message;
import com.maryanto.dimas.example.entity.User;
import com.maryanto.dimas.example.repository.MessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Slf4j
@Controller
@Transactional(readOnly = true)
public class WebSocketController {

    @Autowired
    private MessageRepository messageService;

    @Autowired
    private SimpMessagingTemplate messageTemplate;

    @Transactional
    @MessageMapping("/request")
    public void halo(@Payload MessageDTO message) {
        User userFrom = new User();
        userFrom.setId(message.getFromId());

        User userTo = new User();
        userTo.setId(message.getToId());

        messageService.save(
                new Message(null,
                        message.getMessage(),
                        userFrom,
                        userTo,
                        Timestamp.valueOf(LocalDateTime.now()),
                        null)
        );
        this.messageTemplate.convertAndSendToUser(message.getToId(), "/chat/send", message);
        log.info("message sending: {}", message);
    }
}
