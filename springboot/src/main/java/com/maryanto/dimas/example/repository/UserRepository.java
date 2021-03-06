package com.maryanto.dimas.example.repository;

import com.maryanto.dimas.example.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, String> {

    List<User> findByAdmin(boolean isAdmin);
}
