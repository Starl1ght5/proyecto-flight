package com.stellargear.royal_airlines.Controllers;

import com.stellargear.royal_airlines.Models.Entities.Recommendation;
import com.stellargear.royal_airlines.Models.Utils.ModelData;
import com.stellargear.royal_airlines.Services.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @PostMapping("/recommend")
    public String recommend(@RequestBody ModelData data, @RequestParam String user) {
        try {
            Recommendation recommendation = recommendationService.recommendDestination(data, user);

            return "Destino recomendado: " + recommendation.getRecommendation() + "\nConfianza: " + recommendation.getConfidence();

        } catch (Exception e) {
            return "A unexpected error occurred";
        }
    }
}
