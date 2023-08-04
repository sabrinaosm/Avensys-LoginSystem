package com.LoginRegistration.LoginRegistrationDXC.service;

import com.LoginRegistration.LoginRegistrationDXC.entities.User;
import com.LoginRegistration.LoginRegistrationDXC.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // Create User Account
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Get All Users
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // Get User by ID
    public User getUsersById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    // Delete User
    public String deleteUser(int id) {
        userRepository.deleteById(id);
        return "User deleted.";
    }

    // Authentication
    public User authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    // Update User
    public User updateUser(User user) {
        User existingUser = userRepository.findById(user.getId()).orElse(null);
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());
        existingUser.setFirst_name(user.getFirst_name());
        existingUser.setLast_name(user.getLast_name());
        existingUser.setEmail(user.getEmail());
        existingUser.setGender(user.getGender());
        existingUser.setManager(user.isManager());

        return userRepository.save(existingUser);
    }

    public boolean isUsernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean isEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
