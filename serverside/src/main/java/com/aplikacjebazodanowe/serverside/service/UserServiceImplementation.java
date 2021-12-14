package com.aplikacjebazodanowe.serverside.service;

import com.aplikacjebazodanowe.serverside.model.User;
import com.aplikacjebazodanowe.serverside.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImplementation implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public User getUserByID(Integer id) {
        return userRepository.findById(id).get();
    }

    @Override
    public List<User> getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }


}
