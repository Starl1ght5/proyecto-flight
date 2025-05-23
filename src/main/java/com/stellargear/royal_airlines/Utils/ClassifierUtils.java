package com.stellargear.royal_airlines.Utils;

import com.stellargear.royal_airlines.Models.DTOs.ModelDataDTO;
import com.stellargear.royal_airlines.Models.Utils.ModelData;
import com.stellargear.royal_airlines.Models.Utils.RecommendationResult;
import org.springframework.stereotype.Service;
import weka.core.Attribute;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class ClassifierUtils {

    public ModelData dtoToObject (ModelDataDTO requestingDTO) {
        ModelData returnedObject = new ModelData();

        returnedObject.setPrice(requestingDTO.getPrice());
        returnedObject.setPopularity(requestingDTO.getPopularity());
        returnedObject.setTemperature(requestingDTO.getTemperature());
        returnedObject.setAdventure(checkForPositive(requestingDTO.isAdventure()));
        returnedObject.setDesert(checkForPositive(requestingDTO.isDesert()));
        returnedObject.setBeach(checkForPositive(requestingDTO.isBeach()));
        returnedObject.setHistoric(checkForPositive(requestingDTO.isHistoric()));
        returnedObject.setCultural(checkForPositive(requestingDTO.isCultural()));
        returnedObject.setEco_tourism(checkForPositive(requestingDTO.isEco_tourism()));
        returnedObject.setNight_life(checkForPositive(requestingDTO.isNight_life()));
        returnedObject.setEco_tourism(checkForPositive(requestingDTO.isEco_tourism()));
        returnedObject.setMountain(checkForPositive(requestingDTO.isMountain()));
        returnedObject.setJungle(checkForPositive(requestingDTO.isJungle()));

        return returnedObject;
    }

    public List<RecommendationResult> getTopProbabilities(double[] distribution, Attribute classAttribute, int amount) {
        List<RecommendationResult> results = IntStream.range(0, distribution.length)
                .mapToObj(i -> {
                    RecommendationResult r = new RecommendationResult();
                    r.setLocation(classAttribute.value(i));
                    r.setProbability(distribution[i]);
                    return r;
                })
                .filter(r -> r.getProbability() > 0.01)
                .sorted((a, b) -> Double.compare(b.getProbability(), a.getProbability()))
                .limit(amount)
                .collect(Collectors.toList());

        return results;
    }

    public int checkForPositive (boolean value) {
        if (value) {
            return 1;
        } else {
            return 0;
        }
    }
}
