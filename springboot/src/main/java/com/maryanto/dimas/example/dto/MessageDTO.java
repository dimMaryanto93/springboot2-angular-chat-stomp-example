package com.maryanto.dimas.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDTO {

    private String message;
    private String fromId;
    private String toId;
    private Timestamp dateSent;
    private Timestamp dateSeen;
}
