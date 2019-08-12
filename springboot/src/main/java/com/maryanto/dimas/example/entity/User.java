package com.maryanto.dimas.example.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GenericGenerator(name = "uuid_gen", strategy = "uuid2")
    @GeneratedValue(generator = "uuid_gen")
    @Column(name = "id", nullable = false, unique = true)
    private String id;

    @Column(name = "username", length = 64, unique = true, nullable = false)
    private String username;

    @Column(name = "phone", length = 15, nullable = false)
    private String phone;

    @Column(name = "display_name", length = 50, nullable = false)
    private String displayName;

    @Column(name = "password")
    private String password;

    @Column(name = "is_admin", nullable = false)
    private boolean admin;
}
