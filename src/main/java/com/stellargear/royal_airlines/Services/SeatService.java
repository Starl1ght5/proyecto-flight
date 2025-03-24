package com.stellargear.royal_airlines.Services;


import com.stellargear.royal_airlines.Models.DTOs.SeatDTO;
import com.stellargear.royal_airlines.Models.Entities.Seat;
import com.stellargear.royal_airlines.Repositories.SeatRepository;
import com.stellargear.royal_airlines.Utils.MoneyExchange;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatService {

    private final SeatRepository seatRepository;
    private final MoneyExchange moneyExchange;

    @Transactional(propagation = Propagation.REQUIRED)
    public List<String> generateSeats () {

        List<String> returnedList = new ArrayList<>();
        char letter;

        for (int i = 1; i < 7; i++) {

            letter = (char) ('A' + i - 1);

            for (int e = 1; e < 31; e++) {

                Seat newSeat = new Seat();
                newSeat.setReserved(false);
                newSeat.setSeatNumber(letter + "" + e);

                if (i < 6) {
                    newSeat.setSeatPrice(15.00);

                } else if (i > 6 && i < 13) {
                    newSeat.setSeatPrice(9.00);

                } else {
                    newSeat.setSeatPrice(5.00);
                }

                seatRepository.save(newSeat);
                returnedList.add(newSeat.getSeatID());
            }

        }

        return returnedList;
    }

    public List<SeatDTO> searchAndConvertList (List<String> requestedList) {
        List<Seat> objectList = new ArrayList<>();

        for (String s : requestedList) {
            objectList.add(searchByID(s));
        }

        return objectListToDto(objectList);
    }

    public Seat searchByID (String requestedID) {
        return seatRepository.searchByID(requestedID);
    }

    public List<Seat> searchForListOfIDs (List<String> requestedIDs) {
        List<Seat> returnedList = new ArrayList<>();

        for (String requestedID : requestedIDs) {
            returnedList.add(seatRepository.searchByID(requestedID));
        }

        return returnedList;
    }

    public SeatDTO objectToDto (Seat requestedObject) {
        SeatDTO returnedDto = new SeatDTO();

        returnedDto.setSeatID(requestedObject.getSeatID());
        returnedDto.setSeatNumber(requestedObject.getSeatNumber());
        returnedDto.setSeatPrice(moneyExchange.convertUSDtoCOP(requestedObject.getSeatPrice()));
        returnedDto.setReserved(requestedObject.isReserved());

        return returnedDto;
    }

    public List<SeatDTO> objectListToDto (List<Seat> requestedList) {
        List<SeatDTO> returnedList = new ArrayList<>();

        for (Seat seat : requestedList) {
            returnedList.add(objectToDto(seat));
        }

        return returnedList;
    }
}
