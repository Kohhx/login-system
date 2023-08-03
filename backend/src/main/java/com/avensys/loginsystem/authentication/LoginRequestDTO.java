package com.avensys.loginsystem.authentication;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
        @NotBlank(message = "Username cannot be blank")
        String username,
        @NotBlank(message = "Password cannot be blank")
        @Min(value = 8, message = "Password should be at least 7 character")
        String password
) {
}
