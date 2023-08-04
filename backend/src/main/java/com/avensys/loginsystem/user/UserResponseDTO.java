package com.avensys.loginsystem.user;

import java.util.List;

public record UserResponseDTO(
        long id,
        String firstName,
        String lastName,
        String username,
        List<String> roles
) {
}
