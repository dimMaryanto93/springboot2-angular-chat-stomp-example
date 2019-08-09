package com.maryanto.dimas.example.repository;

import com.maryanto.dimas.example.entity.Message;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MessageRepository extends CrudRepository<Message, String> {

    @Query("from Message where toUser.id in (?1, ?2) and fromUser.id in (?1, ?2) order by createdDate asc")
    List<Message> findByFromOrToUserId(String from, String to);
}
