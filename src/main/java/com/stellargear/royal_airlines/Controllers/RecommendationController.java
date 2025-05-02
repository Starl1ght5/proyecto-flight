package com.stellargear.royal_airlines.Controllers;

import com.stellargear.royal_airlines.Models.DTOs.ModelDataDTO;
import com.stellargear.royal_airlines.Services.InformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/recommendation")
public class RecommendationController {

    private final InformationService informationService;

    @PostMapping(path = "/recommend")
    public ResponseEntity<?> recommendBasedOnParameters (@RequestBody ModelDataDTO data) throws Exception {
        return informationService.searchAndRecommend(data);
    }
}
