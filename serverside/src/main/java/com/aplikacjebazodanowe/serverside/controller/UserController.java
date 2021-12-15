package com.aplikacjebazodanowe.serverside.controller;

import com.aplikacjebazodanowe.serverside.model.User;
import com.aplikacjebazodanowe.serverside.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/addUser")
    public ResponseEntity<String> addUser(@RequestBody User user){
        List<User> dbList = userService.getUserByEmail(user.getEmail());
        String emailRegex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
        Pattern pattern = Pattern.compile(emailRegex);
        if(!pattern.matcher(user.getEmail()).matches()){
            return new ResponseEntity<String>("Invalid email", HttpStatus.NOT_ACCEPTABLE);
        }
        if(!dbList.isEmpty()){
            return new ResponseEntity<String>("Email already in use", HttpStatus.CONFLICT);
        }else{
            userService.addUser(user);
            return new ResponseEntity<String>("User created", HttpStatus.OK);
        }
    }

    @PostMapping("/loginAuth")
    public ResponseEntity<User> loginAuth(@RequestBody User user){
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        List<User> dbList = userService.getUserByEmail(user.getEmail());
        String emailRegex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
        Pattern pattern = Pattern.compile(emailRegex);
        if(!pattern.matcher(user.getEmail()).matches()){
            return new ResponseEntity<User>(HttpStatus.NOT_ACCEPTABLE);
        }
        if(dbList.isEmpty()){
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }else{
            User dbUser = dbList.get(0);
            if(!passwordEncoder.matches(user.getPassword(),dbUser.getPassword())){
                return new ResponseEntity<User>(HttpStatus.CONFLICT);
            }else{
                return new ResponseEntity<User>(dbUser, HttpStatus.OK);
            }
        }
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
