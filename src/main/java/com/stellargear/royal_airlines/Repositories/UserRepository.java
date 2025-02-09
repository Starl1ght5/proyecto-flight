package com.stellargear.royal_airlines.Repositories;

import com.stellargear.royal_airlines.Models.Entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<String, User> {
}
