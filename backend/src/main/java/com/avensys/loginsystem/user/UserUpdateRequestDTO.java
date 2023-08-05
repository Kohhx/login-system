package com.avensys.loginsystem.user;

import java.util.List;

public record UserUpdateRequestDTO(
        long id,
        String firstName,
        String lastName,
        String username,
        String password,
        List<String> roles
) {
}
