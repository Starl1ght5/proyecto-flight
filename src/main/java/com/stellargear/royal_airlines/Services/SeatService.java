package com.stellargear.royal_airlines.Services;


import com.stellargear.royal_airlines.Models.DTOs.SeatDTO;
import com.stellargear.royal_airlines.Models.Entities.Seat;
import com.stellargear.royal_airlines.Repositories.SeatRepository;
import com.stellargear.royal_airlines.Utils.MoneyExchange;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatService {

    private final SeatRepository seatRepository;
    private final MoneyExchange moneyExchange;

    public List<Seat> generateSeats () {

        List<Seat> returnedList = new ArrayList<>();
        char letter;

        for (int i = 1; i < 7; i++) {

            letter = (char) ('A' + i - 1);

            for (int e = 1; e < 31; e++) {

                Seat newSeat = new Seat();
                newSeat.setReserved(false);
                newSeat.setSeatNumber(letter + "" + e);

                if (i < 6) {
                    newSeat.setSeatPrice(30.00);

                } else if (i > 6 && i < 13) {
                    newSeat.setSeatPrice(20.00);

                } else {
                    newSeat.setSeatPrice(10.00);
                }

                seatRepository.save(newSeat);
                returnedList.add(newSeat);
            }

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
