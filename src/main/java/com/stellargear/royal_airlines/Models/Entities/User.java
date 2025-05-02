package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Getter
@Setter
@Document(collection = "Users")
public class User {

    @Id
    private String userID;
    private String username;
    private String email;
    private String password;

    private boolean verified;
    private String verificationCode;

    public User () {
        this.verified = false;
        this.verificationCode = UUID.randomUUID().toString();
    }

}
