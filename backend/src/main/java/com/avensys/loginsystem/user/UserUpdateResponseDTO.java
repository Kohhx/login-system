package com.avensys.loginsystem.user;

import java.util.List;

public record UserUpdateResponseDTO(         String message,
                                             long id,
                                             String firstName,
                                             String lastName,
                                             String username,
                                             String token,
                                             List<String> roles) {

}
