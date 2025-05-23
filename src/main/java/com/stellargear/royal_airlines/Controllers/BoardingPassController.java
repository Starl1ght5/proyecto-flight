package com.stellargear.royal_airlines.Controllers;

import com.stellargear.royal_airlines.Services.BoardingPassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping( path = "/api/v1/boarding")
public class BoardingPassController {

    private final BoardingPassService boardingPassService;


    @GetMapping (path = "/searchAll")
    public ResponseEntity<?> getAllBoardingPassesOfUser (@RequestParam String user) {
        return boardingPassService.getAllBoardingPassesOfUser(user);
    }


    @GetMapping (path = "/searchActive")
    public ResponseEntity<?> getAllActiveBoardingPassesOfUser (@RequestParam String user) {
        return boardingPassService.getAllActiveBoardingPassesOfUser(user);
    }


    @GetMapping (path = "/searchInactive")
    public ResponseEntity<?> getAllInactiveBoardingPassesOfUser (@RequestParam String user) {
        return boardingPassService.getAllInactiveBoardingPassesOfUser(user);
    }
}
