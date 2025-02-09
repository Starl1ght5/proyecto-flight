package com.stellargear.royal_airlines.Models.DTOs;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTO {

    private String userID;
    private String username;
    private String email;
    private String password;
    private boolean verified;

    public UserDTO () {}
}
