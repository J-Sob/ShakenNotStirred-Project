package com.aplikacjebazodanowe.serverside.repository;

import com.aplikacjebazodanowe.serverside.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    List<User> getUserByEmail(String email);
}
