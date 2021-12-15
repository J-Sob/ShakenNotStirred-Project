package com.aplikacjebazodanowe.serverside.service;

import com.aplikacjebazodanowe.serverside.model.User;

import java.util.List;

public interface UserService {
    public User addUser(User user);
    public List<User> getAllUsers();
    public void deleteUser(Integer id);
    public User getUserByID(Integer id);
    public List<User> getUserByEmail(String email);
}
