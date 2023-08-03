package com.avensys.loginsystem.authentication;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class AuthenticationController {

    @PostMapping("signup")
    public ResponseEntity<AuthenticationResponseDTO> signup(@RequestBody UserRegistrationRequestDTO userRegistration) {
        User user = authenticationService.registerUser(userRegistration);
        String token = jwtService.generateToken(user.getEmail());
        return new ResponseEntity<>(new AuthenticationResponseDTO(
                user.getId(),
                "Account has been registered",
                user.getEmail(),
                token,
                user.getRole()),
                HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<AuthenticationResponseDTO> authenticateAndGetToken(@RequestBody AuthLoginRequestDTO authRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(),
                        authRequest.getPassword()));

        if (authentication.isAuthenticated()) {
            AuthenticationResponseDTO responseDTO = authenticationService.getUserAuthResponse(authRequest.getEmail(), "Login successfully");
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } else {
            throw new ResourceNotFoundException("Invalid user request");
        }
    }

}
