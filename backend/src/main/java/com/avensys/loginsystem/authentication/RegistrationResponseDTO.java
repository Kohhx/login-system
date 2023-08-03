package com.avensys.loginsystem.authentication;

import java.util.List;

public record RegistrationResponseDTO(
        String message,
        long id,
        String firstName,
        String lastName,
        String username,
        String token,
        List<String> roles
) {
}
