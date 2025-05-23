package com.stellargear.royal_airlines.Repositories;

import com.stellargear.royal_airlines.Models.Entities.BoardingPass;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface BoardingPassRepository extends MongoRepository<BoardingPass, String> {

    @Query("{ 'boardingPassID' : ?0 }")
    BoardingPass searchByID (String requestedID);

    @Query("{ 'bookedUserID' : ?0 }")
    List<BoardingPass> searchListByUserID (String requestedID);

    @Query("{ 'bookedUserID' : ?0, 'status' : ?1 }")
    List<BoardingPass> searchListByUserAndStatus (String requestedID, String status);
}
