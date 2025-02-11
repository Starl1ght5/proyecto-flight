package com.stellargear.royal_airlines.Repositories;

import com.stellargear.royal_airlines.Models.Entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {

    @Query("{ 'email' : ?0 }")
    User isEmailTaken(String requestedEmail);

    @Query("{ 'email' : ?0 }")
    User searchByEmail(String requestedEmail);
}
