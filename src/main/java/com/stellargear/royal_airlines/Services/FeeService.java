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

    public List<Fee> getFees () {
        return feeRepository.findAll();
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
