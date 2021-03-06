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
import java.util.regex.Pattern;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/addUser")
    public ResponseEntity<String> addUser(@RequestBody User user){
        List<User> dbList = userService.getUserByEmail(user.getEmail());
        String emailRegex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
        Pattern pattern = Pattern.compile(emailRegex);
        if(!pattern.matcher(user.getEmail()).matches()){
            return new ResponseEntity<>("Invalid email", HttpStatus.NOT_ACCEPTABLE);
        }
        if(!dbList.isEmpty()){
            return new ResponseEntity<>("Email already in use", HttpStatus.CONFLICT);
        }else{
            userService.addUser(user);
            return new ResponseEntity<>("User created", HttpStatus.OK);
        }
    }

    @PostMapping("/loginAuth")
    public ResponseEntity<User> loginAuth(@RequestBody User user){
        List<User> dbList = userService.getUserByEmail(user.getEmail());
        String emailRegex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
        Pattern pattern = Pattern.compile(emailRegex);
        if(!pattern.matcher(user.getEmail()).matches()){
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        if(dbList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            User dbUser = dbList.get(0);
            if(!passwordEncoder.matches(user.getPassword(),dbUser.getPassword())){
                return new ResponseEntity<User>(HttpStatus.CONFLICT);
            }else{
                return new ResponseEntity<User>(dbUser, HttpStatus.OK);
            }
        }
    }

    @GetMapping("/passwordVerification/{id}")
    public ResponseEntity<String> passwordVerification(@RequestParam String password, @PathVariable Integer id){
        User user = userService.getUserByID(id);
        if(!passwordEncoder.matches(password,user.getPassword())) {
            return new ResponseEntity<String>("Incorrect password.", HttpStatus.CONFLICT);
        }else{
            return new ResponseEntity<String>(HttpStatus.OK);
        }
    }

    @PatchMapping("/updatePassword/{id}/{newpassword}")
    public ResponseEntity<String> updatePassword(@PathVariable String newpassword, @PathVariable Integer id){
        System.out.println(newpassword);
        User user = userService.getUserByID(id);
        user.setPassword(newpassword);
        userService.addUser(user);
        return new ResponseEntity<String>("Password changed.", HttpStatus.OK);
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
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id){
        try{
            userService.deleteUser(id);
            return new ResponseEntity<>("User deleted.", HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<>("User not fount.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<?> deleteAll(){
        try{
            List<User> users = userService.getUserByEmail("admin@admin.com");
            User admin = users.get(0);
            admin.setPassword("admin");
            userService.deleteAll();
            userService.addUser(admin);
            return new ResponseEntity<>("User table dropped.", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Something went wrong.", HttpStatus.BAD_REQUEST);
        }
    }
}
