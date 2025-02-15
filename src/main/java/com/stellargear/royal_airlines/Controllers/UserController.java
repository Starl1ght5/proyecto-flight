package com.stellargear.royal_airlines.Controllers;

import com.stellargear.royal_airlines.Models.DTOs.UserDTO;
import com.stellargear.royal_airlines.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserService userService;

    @PostMapping(path = "/api/users/register")
    public ResponseEntity<?> registerUser (@RequestBody UserDTO userInfo) {
        return userService.registerNewUser(userInfo);
    }

    @PostMapping(path = "/api/users/login")
    public ResponseEntity<?> loginUser (@RequestBody UserDTO userInfo) {
        return userService.login(userInfo);
    }
}
