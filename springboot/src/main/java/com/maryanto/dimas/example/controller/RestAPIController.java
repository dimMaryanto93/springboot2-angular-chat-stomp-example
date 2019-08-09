package com.maryanto.dimas.example.controller;

import com.maryanto.dimas.example.dto.MessageDTO;
import com.maryanto.dimas.example.entity.Message;
import com.maryanto.dimas.example.entity.User;
import com.maryanto.dimas.example.repository.MessageRepository;
import com.maryanto.dimas.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Transactional(readOnly = true)
public class RestAPIController {

    @Autowired
    private UserRepository userService;
    @Autowired
    private MessageRepository messageService;

    @GetMapping("/users/list")
    public Iterable<User> listFriend() {
        return this.userService.findAll();
    }

    @GetMapping("/message/history/byUser")
    public ResponseEntity<?> listMessageByUserId(
            @RequestParam(name = "fromId") String userIdFrom,
            @RequestParam(name = "toId") String userIdTo) {
        Optional<User> fromUserOptional = this.userService.findById(userIdFrom);
        if (!fromUserOptional.isPresent())
            return ResponseEntity.noContent().build();

        Optional<User> toUserOptinal = this.userService.findById(userIdTo);
        if (!toUserOptinal.isPresent())
            return ResponseEntity.noContent().build();

        List<MessageDTO> messagesDTO = new ArrayList<>();
        List<Message> messages = this.messageService.findByFromOrToUserId(userIdFrom, userIdTo);
        messages.forEach(data -> {
            messagesDTO.add(new MessageDTO(
                    data.getMessage(),
                    data.getFromUser().getId(),
                    data.getToUser().getId(),
                    data.getCreatedDate(),
                    data.getLastSeen())
            );
        });
        return ResponseEntity.ok(messagesDTO);
    }


}
