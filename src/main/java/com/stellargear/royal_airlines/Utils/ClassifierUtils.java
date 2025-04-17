package com.stellargear.royal_airlines.Utils;

import com.stellargear.royal_airlines.Models.DTOs.ModelDataDTO;
import com.stellargear.royal_airlines.Models.Utils.ModelData;
import org.springframework.stereotype.Service;

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

    public int checkForPositive (boolean value) {
        if (value) {
            return 1;
        } else {
            return 0;
        }
    }
}
