package com.stellargear.royal_airlines.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Setter
@Getter
public class User {

    @Id
    private String userID;
    private String username;
    private String email;
    private String password;
    private boolean verified;

    public User () {}
}
