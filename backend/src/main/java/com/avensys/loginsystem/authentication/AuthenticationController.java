package com.avensys.loginsystem.authentication;

import com.avensys.loginsystem.oauth.OAuthRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("signup")
    public ResponseEntity<RegistrationResponseDTO> signup(@RequestBody RegistrationRequestDTO registrationRequest) {
        RegistrationResponseDTO registrationResponse = authenticationService.signUpUser(registrationRequest);
        return new ResponseEntity<>(registrationResponse, HttpStatus.CREATED);
    }

    @PostMapping("signup-oauth")
    public ResponseEntity<RegistrationResponseDTO> signupOAuth(@RequestBody OAuthRequestDTO oauthRequest) {
        RegistrationResponseDTO registrationResponse = authenticationService.signUpUserOAuth(oauthRequest);
        return new ResponseEntity<>(registrationResponse, HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<LoginResponseDTO> authenticateAndGetToken(@RequestBody LoginRequestDTO loginRequest) {
        LoginResponseDTO loginResponse = authenticationService.loginUser(loginRequest);
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }

    @PostMapping("login-oauth")
    public ResponseEntity<LoginResponseDTO> authenticateAndGetTokenOAuth(@RequestBody OAuthRequestDTO oauthRequest) {
        LoginResponseDTO loginResponse = authenticationService.loginUserOAuth(oauthRequest);
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }

}

