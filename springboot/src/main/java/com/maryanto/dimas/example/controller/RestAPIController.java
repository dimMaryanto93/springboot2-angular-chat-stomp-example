package com.maryanto.dimas.example.controller;

import com.maryanto.dimas.example.dto.MessageDTO;
import com.maryanto.dimas.example.entity.Message;
import com.maryanto.dimas.example.entity.User;
import com.maryanto.dimas.example.repository.MessageRepository;
import com.maryanto.dimas.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/api")
@Transactional(readOnly = true)
public class RestAPIController {

    @Autowired
    private UserRepository userService;
    @Autowired
    private MessageRepository messageService;

    @GetMapping("/users/list")
    public List<User> listUser(@RequestParam("admin") boolean isAdmin) {
        return this.userService.findByAdmin(isAdmin);
    }

    @GetMapping("/users/{userId}/user")
    public ResponseEntity<?> findUserById(@PathVariable("userId") String id) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent())
            return ok(userOptional.get());
        else
            return noContent().build();
    }

    @GetMapping("/message/history/byUser")
    public ResponseEntity<?> listMessageByUserId(
            @RequestParam(name = "fromId") String userIdFrom,
            @RequestParam(name = "toId") String userIdTo) {
        Optional<User> fromUserOptional = this.userService.findById(userIdFrom);
        if (!fromUserOptional.isPresent())
            return noContent().build();

        Optional<User> toUserOptinal = this.userService.findById(userIdTo);
        if (!toUserOptinal.isPresent())
            return noContent().build();

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
        return ok(messagesDTO);
    }


}
