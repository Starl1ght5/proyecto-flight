package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.UserDTO;
import com.stellargear.royal_airlines.Models.Entities.User;
import com.stellargear.royal_airlines.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    public ResponseEntity<?> registerNewUser (UserDTO registeringUserInfo) {

        boolean emailTaken = isEmailTaken(registeringUserInfo.getEmail());

        if (!emailTaken) {
            User newUser = new User();
            newUser.setEmail(registeringUserInfo.getEmail());
            newUser.setPassword(encoder.encode(registeringUserInfo.getPassword()));
            newUser.setVerified(false);

            userRepository.save(newUser);

            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> login (UserDTO loginInfo) {
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginInfo.getEmail(), loginInfo.getPassword()));

        if (authentication.isAuthenticated()) {
            return new ResponseEntity<>(jwtService.generateToken(loginInfo.getEmail()), HttpStatus.ACCEPTED);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    public boolean isEmailTaken (String requestedEmail) {
        return userRepository.isEmailTaken(requestedEmail).isVerified();
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
