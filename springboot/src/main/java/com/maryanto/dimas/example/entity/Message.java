package com.maryanto.dimas.example.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    private String message;
    private String fromId;
    private String toId;
    private Timestamp dateSent;
    private Timestamp dateSeen;
}
