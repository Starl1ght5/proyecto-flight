package com.stellargear.royal_airlines.Controllers;

import com.stellargear.royal_airlines.Models.DTOs.UserDTO;
import com.stellargear.royal_airlines.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping( path = "/api/v1/users" )
public class UserController {

    private final UserService userService;

    @PostMapping(path = "/register")
    public ResponseEntity<?> registerUser (@RequestBody UserDTO userInfo) {
        return userService.registerNewUser(userInfo);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser (@RequestBody UserDTO userInfo) {
        return userService.login(userInfo);
    }

    @GetMapping(path = "/verify")
    public ResponseEntity<?> verifyUser (@RequestParam String verificationCode) {
        return userService.verifyUser(verificationCode);
    }

    @GetMapping(path = "/googleLogin")
    public ResponseEntity<?> loginWithGoogle (@RequestParam String email, @RequestParam String sub) {
        return userService.loginWithGoogle(email, sub);
    }
}
