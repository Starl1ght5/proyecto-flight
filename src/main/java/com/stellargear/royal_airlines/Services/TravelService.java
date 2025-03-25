package com.stellargear.royal_airlines.Services;

import com.stellargear.royal_airlines.Models.DTOs.TravelInfoDTO;
import com.stellargear.royal_airlines.Models.Entities.TravelInfo;
import com.stellargear.royal_airlines.Repositories.TravelInformationRepository;
import com.stellargear.royal_airlines.Utils.GlobalLogger;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TravelService {

    private final TravelInformationRepository travelInfoRepository;
    private final FlightService flightService;


    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> generateNewTravel (String departureFlight) {
        TravelInfo newTravel = new TravelInfo();
        boolean depDis = flightService.checkFlightForDiscount(departureFlight);
        boolean arrDis = false;

        newTravel.setDepartureFlight(departureFlight);

//        if (arrivalFlight.isPresent()) {
//            newTravel.setArrivalFlight(arrivalFlight.get());
//            newTravel.setRoundTrip(true);
//            arrDis = flightService.checkFlightForDiscount(arrivalFlight.get());
//
//        } else {
        newTravel.setArrivalFlight("Empty");
        newTravel.setRoundTrip(false);

        if (depDis || arrDis) {
            newTravel.setDiscounted(true);
        }

        newTravel.setStatus("Active");

        travelInfoRepository.save(newTravel);

        GlobalLogger.getLogger().info("New travel plan has been defined!");
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    public String getFlightFromTravel (String requestedTravelID) {
        TravelInfo requestedTravel = travelInfoRepository.searchByID(requestedTravelID);
        return requestedTravel.getDepartureFlight();
    }

    public TravelInfo searchByID (String requestedID) {
        return travelInfoRepository.searchByID(requestedID);
    }

    public TravelInfoDTO searchAndConvertObject (String requestedTravelID) {
        return objectToDto(searchByID(requestedTravelID));
    }

    public TravelInfoDTO objectToDto (TravelInfo requestedObject) {
        TravelInfoDTO requestedDto = new TravelInfoDTO();

        requestedDto.setTravelInfoID(requestedObject.getTripInfoID());
        requestedDto.setStatus(requestedObject.getStatus());
        requestedDto.setRoundTrip(requestedObject.isRoundTrip());
        requestedDto.setDepartureFlight(flightService.searchAndConvertObject(requestedObject.getDepartureFlight()));

        if (requestedObject.getArrivalFlight().equals("Empty")) {
            requestedDto.setArrivalFlight(null);
        } else {
            requestedDto.setArrivalFlight(flightService.searchAndConvertObject(requestedObject.getArrivalFlight()));
        }

        return requestedDto;
    }
}
