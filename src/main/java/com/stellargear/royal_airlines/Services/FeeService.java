package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.FeeDTO;
import com.stellargear.royal_airlines.Models.Entities.Fee;
import com.stellargear.royal_airlines.Repositories.FeeRepository;
import com.stellargear.royal_airlines.Utils.MoneyExchange;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeeService {

    private final FeeRepository feeRepository;
    private final MoneyExchange moneyExchange;

    public List<String> getFees () {
        List<Fee> repoFees = feeRepository.findAll();
        return getIDs(repoFees);
    }

    public List<String> getIDs (List<Fee> requestedList) {
        List<String> returnedList = new ArrayList<>();

        for (Fee fee : requestedList) {
            returnedList.add(fee.getFeeID());
        }

        return returnedList;
    }

    public FeeDTO searchAndConvertObject (String requestedID) {
        return simpleObjectToDto(searchByID(requestedID));
    }

    public List<FeeDTO> searchAndConvertList (List<String> requestedList, double price) {
        List<Fee> objectList = new ArrayList<>();

        for (String s : requestedList) {
            objectList.add(searchByID(s));
        }

        return objectListToDto(objectList, price);
    }

    public Fee searchByID (String requestedID) {
        return feeRepository.searchByID(requestedID);
    }

    public FeeDTO simpleObjectToDto (Fee requestedObject) {
        FeeDTO returnedDto = new FeeDTO();

        returnedDto.setFeeID(requestedObject.getFeeID());
        returnedDto.setFeeName(requestedObject.getFeeName());
        returnedDto.setPriceDifference(requestedObject.getPriceDifference());

        return returnedDto;
    }

    public FeeDTO objectToDto (Fee requestedObject, double ticketPrice) {
        FeeDTO returnedDto = new FeeDTO();

        returnedDto.setFeeID(requestedObject.getFeeID());
        returnedDto.setFeeName(requestedObject.getFeeName());
        returnedDto.setPriceDifference(requestedObject.getPriceDifference());
        returnedDto.setPrice(moneyExchange.calculateFees(requestedObject.getPriceDifference(), ticketPrice));

        return returnedDto;
    }

    public List<FeeDTO> objectListToDto (List<Fee> requestedList, double price) {
        List<FeeDTO> returnedList = new ArrayList<>();

        for (Fee fee : requestedList) {
            returnedList.add(objectToDto(fee, price));
        }

        return returnedList;
    }


}
