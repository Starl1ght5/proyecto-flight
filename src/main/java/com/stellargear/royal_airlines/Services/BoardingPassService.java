package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.BoardingPassDTO;
import com.stellargear.royal_airlines.Models.Entities.BoardingPass;
import com.stellargear.royal_airlines.Models.Entities.Fee;
import com.stellargear.royal_airlines.Models.Entities.Flight;
import com.stellargear.royal_airlines.Models.Entities.Seat;
import com.stellargear.royal_airlines.Repositories.BoardingPassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class BoardingPassService {

    private final BoardingPassRepository boardingPassRepository;
    private final LocationService locationService;

    private static final char[] GATE_NUMBERS = {'A', 'B', 'C', 'D'};

    @Transactional( propagation = Propagation.REQUIRED)
    public ResponseEntity<?> createBoardingPass (String userID, List<Seat> seats, Flight flight, Fee fee) {
        BoardingPass newPass = new BoardingPass();

        Random numberPicker = new Random();
        List<String> seatIDs = new ArrayList<>();
        List<String> seatNumbers = new ArrayList<>();

        for (Seat seat : seats) {
            seatIDs.add(seat.getSeatID());
            seatNumbers.add(seat.getSeatNumber());
        }

        newPass.setBookedUserID(userID);
        newPass.setStatus("Active");
        newPass.setGroup(String.valueOf(numberPicker.nextInt(1, 20)));
        newPass.setGate(generateGate());

        newPass.setSeats(seatNumbers);
        newPass.setBookedSeatIDs(seatIDs);
        newPass.setSeatClass(fee.getFeeName());

        newPass.setAirline(flight.getAirline());
        newPass.setDepartureDate(flight.getDepartureDate());
        newPass.setFlightNumber(flight.getFlightNumber());
        newPass.setBookedFlightID(flight.getFlightID());
        newPass.setArrivalIataCode(locationService.searchByID(flight.getArrivalLocationID()).getIataCode());
        newPass.setDepartureIataCode(locationService.searchByID(flight.getDepartureLocationID()).getIataCode());

        boardingPassRepository.save(newPass);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    public String generateGate () {
        Random rng = new Random();

        int numberToSelect = rng.nextInt(GATE_NUMBERS.length);
        char letter = GATE_NUMBERS[numberToSelect];

        return letter + "" + rng.nextInt(1, 4);
    }


    public ResponseEntity<?> getAllBoardingPassesOfUser (String userID) {
        List<BoardingPassDTO> returnedList = searchAndConvertListForUser(userID);

        if (!returnedList.isEmpty()) {
            return new ResponseEntity<>(returnedList, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }

    }


    public ResponseEntity<?> getAllActiveBoardingPassesOfUser (String userID) {
        List<BoardingPassDTO> returnedList = searchAndConvertActiveListForUser(userID);

        if (!returnedList.isEmpty()) {
            return new ResponseEntity<>(returnedList, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }
    }


    public ResponseEntity<?> getAllInactiveBoardingPassesOfUser (String userID) {
        List<BoardingPassDTO> returnedList = searchAndConvertInactiveListForUser(userID);

        if (!returnedList.isEmpty()) {
            return new ResponseEntity<>(returnedList, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }
    }


    public BoardingPassDTO objectToDto (BoardingPass requestedObject) {
        BoardingPassDTO returnedDto = new BoardingPassDTO();

        returnedDto.setBoardingPassID(requestedObject.getBoardingPassID());
        returnedDto.setGate(requestedObject.getGate());
        returnedDto.setGroup(requestedObject.getGroup());
        returnedDto.setAirline(requestedObject.getAirline());
        returnedDto.setSeats(requestedObject.getSeats());
        returnedDto.setDepartureDate(requestedObject.getDepartureDate());
        returnedDto.setFlightNumber(requestedObject.getFlightNumber());
        returnedDto.setPassengerInfo(requestedObject.getPassengerInfo());
        returnedDto.setArrivalIataCode(requestedObject.getArrivalIataCode());
        returnedDto.setDepartureIataCode(requestedObject.getDepartureIataCode());
        returnedDto.setSeatClass(requestedObject.getSeatClass());

        return returnedDto;
    }


    public List<BoardingPassDTO> searchAndConvertListForUser (String userToSearch) {
        return objectListToDto(boardingPassRepository.searchListByUserID(userToSearch));
    }


    public List<BoardingPassDTO> searchAndConvertActiveListForUser (String userToSearch) {
        return objectListToDto(boardingPassRepository.searchListByUserAndStatus(userToSearch, "Active"));
    }


    public List<BoardingPassDTO> searchAndConvertInactiveListForUser (String userToSearch) {
        return objectListToDto(boardingPassRepository.searchListByUserAndStatus(userToSearch, "Inactive"));
    }


    public List<BoardingPassDTO> objectListToDto (List<BoardingPass> requestedList) {
        List<BoardingPassDTO> returnedList = new ArrayList<>();

        for (BoardingPass boardingPass : requestedList) {
            returnedList.add(objectToDto(boardingPass));
        }

        return returnedList;
    }
}
