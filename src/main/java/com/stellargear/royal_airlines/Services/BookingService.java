package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Repositories.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
}
