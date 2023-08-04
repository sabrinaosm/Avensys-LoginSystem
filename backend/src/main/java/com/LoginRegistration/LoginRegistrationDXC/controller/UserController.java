package com.LoginRegistration.LoginRegistrationDXC.controller;

import com.LoginRegistration.LoginRegistrationDXC.entities.User;
import com.LoginRegistration.LoginRegistrationDXC.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST,
        RequestMethod.DELETE, RequestMethod.PUT}, allowedHeaders = "Content-Type")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestParam("username") String username,
                                        @RequestParam("password") String password) {
        User user = userService.authenticateUser(username, password);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        boolean isUsernameExist = userService.isUsernameExists(user.getUsername());
        boolean isEmailExist = userService.isEmailExists(user.getEmail());
        if (isUsernameExist) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already in use. Please try another" +
                    " username.");
        };
        if (isEmailExist) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already in use. Please try another " +
                    "username.");
        };
        userService.saveUser(user);
        return ResponseEntity.ok("User has successfully registered an account.");
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/user/{id}")
    public User String(@PathVariable("id") Integer id) {
        return userService.getUsersById(id);
    }

    @DeleteMapping("/deleteuser/{id}")
    public String deleteUser(@PathVariable("id") Integer id) {
        return userService.deleteUser(id);
    }

    @PutMapping("/updateuser")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }
}
