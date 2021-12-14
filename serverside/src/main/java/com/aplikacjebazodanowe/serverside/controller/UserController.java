package com.aplikacjebazodanowe.serverside.controller;

import com.aplikacjebazodanowe.serverside.model.User;
import com.aplikacjebazodanowe.serverside.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/addUser")
    public String addUser(@RequestBody User user){
        userService.addUser(user);
        return "New user added";
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id){
        try{
            User user = userService.getUserByID(id);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getUserByEmail/{email}")
    public ResponseEntity<List<User>> getUserByEmail(@PathVariable String email){
        try{
            List<User> users = userService.getUserByEmail(email);
            return new ResponseEntity<List<User>>(users, HttpStatus.OK);
        } catch(NoSuchElementException e){
            return new ResponseEntity<List<User>>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable Integer id){
        userService.deleteUser(id);
        return "User " + id + " has been deleted";
    }
}
