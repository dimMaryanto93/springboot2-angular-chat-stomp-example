package com.maryanto.dimas.example.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GenericGenerator(name = "uuid_gen", strategy = "uuid2")
    @GeneratedValue(generator = "uuid_gen")
    @Column(name = "id", nullable = false, unique = true)
    private String id;

    @Type(type = "text")
    @Column(name = "message")
    private String message;

    @ManyToOne
    @JoinColumn(name = "from_id", nullable = false)
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "to_id", nullable = false)
    private User toUser;

    @Column(name = "created_date", nullable = false)
    private Timestamp createdDate;

    @Column(name = "seem_date")
    private Timestamp lastSeen;
}
