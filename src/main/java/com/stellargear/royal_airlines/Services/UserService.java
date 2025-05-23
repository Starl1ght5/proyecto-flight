package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.UserDTO;
import com.stellargear.royal_airlines.Models.Entities.User;
import com.stellargear.royal_airlines.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> registerNewUser (UserDTO registeringUserInfo) {

        boolean emailTaken = isEmailTaken(registeringUserInfo.getEmail());

        if (!emailTaken) {
            User newUser = new User();
            newUser.setEmail(registeringUserInfo.getEmail());
            newUser.setPassword(encoder.encode(registeringUserInfo.getPassword()));

            userRepository.save(newUser);

            return new ResponseEntity<>(HttpStatus.CREATED);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> registerGoogleUser (UserDTO registeringUserInfo) {

        boolean emailTaken = isEmailTaken(registeringUserInfo.getEmail());

        if (!emailTaken) {
            User newUser = new User();
            newUser.setEmail(registeringUserInfo.getEmail());
            newUser.setPassword(encoder.encode(registeringUserInfo.getPassword()));

            userRepository.save(newUser);

            return loginGoogleUser(registeringUserInfo);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    public ResponseEntity<?> login(UserDTO loginInfo) {
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginInfo.getEmail(), loginInfo.getPassword())
                );

        if (authentication.isAuthenticated()) {
            User user = searchForUser(loginInfo.getEmail());
            String token = jwtService.generateToken(user);

            return ResponseEntity.status(HttpStatus.ACCEPTED).body(token);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }


    public ResponseEntity<?> loginGoogleUser(UserDTO loginInfo) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginInfo.getEmail(), loginInfo.getPassword())
            );

            if (authentication.isAuthenticated()) {
                User user = searchForUser(loginInfo.getEmail());
                String token = jwtService.generateToken(user);

                URI redirectUri = URI.create("https://royalairlines.netlify.app/oauth-success?token=" + token);
                return ResponseEntity.status(HttpStatus.SEE_OTHER)
                        .location(redirectUri)
                        .build();
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    public ResponseEntity<?> loginWithGoogle (String email, String sub) {
        boolean taken = isEmailTaken(email);

        UserDTO info = new UserDTO();

        info.setEmail(email);
        info.setPassword(sub);

        if (taken) {
            return loginGoogleUser(info);
        } else {
            return registerGoogleUser(info);
        }

    }


    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> verifyUser (String token) {
        User requestingUser = userRepository.searchFromToken(token);

        if (requestingUser != null) {

            requestingUser.setVerified(true);
            requestingUser.setVerificationCode("");

            userRepository.save(requestingUser);

            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    public boolean isEmailTaken (String requestedEmail) {
        return userRepository.isEmailTaken(requestedEmail) != null;
    }


    public User searchForUser (String requestedEmail) {
        return userRepository.searchByEmail(requestedEmail);
    }


    public UserDTO objectToDto (User requestedObject) {
        UserDTO returnedDto = new UserDTO();
        returnedDto.setUserID(requestedObject.getUserID());
        returnedDto.setEmail(requestedObject.getEmail());
        returnedDto.setPassword(requestedObject.getPassword());
        returnedDto.setUsername(requestedObject.getUsername());
        returnedDto.setVerified(requestedObject.isVerified());
        return returnedDto;
    }
}
