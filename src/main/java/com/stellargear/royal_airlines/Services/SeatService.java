package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.Entities.Seat;
import com.stellargear.royal_airlines.Repositories.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.joda.money.CurrencyUnit;
import org.joda.money.Money;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatService {

    private final SeatRepository seatRepository;

    public List<Seat> generateSeats () {

        List<Seat> returnedList = new ArrayList<>();

        for (int i = 1; i < 180; i++) {
            Seat newSeat = new Seat();
            newSeat.setReserved(false);

            if (i < 23) {
                newSeat.setSeatPrice(Money.of(CurrencyUnit.USD, 30.00));

            } else if (i > 23 && i < 59) {
                newSeat.setSeatPrice(Money.of(CurrencyUnit.USD, 20.00));

            } else {
                newSeat.setSeatPrice(Money.of(CurrencyUnit.USD, 10.00));
            }

            seatRepository.save(newSeat);
            returnedList.add(newSeat);
        }

        return returnedList;

    }
}
