package com.avensys.loginsystem.authentication;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record GoogleRequestDTO(
        @NotEmpty(message = "First name cannot be blank")
        String firstName,
        @NotBlank(message = "Last name cannot be blank")
        String lastName,
        @NotBlank(message = "Username cannot be blank")
        String username
) {
}
