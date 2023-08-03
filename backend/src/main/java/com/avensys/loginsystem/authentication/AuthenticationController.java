package com.avensys.loginsystem.authentication;

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
//        String token = jwtService.generateToken(user.getEmail());
        return new ResponseEntity<>(registrationResponse, HttpStatus.CREATED);
    }

//    @PostMapping("login")
//    public ResponseEntity<AuthenticationResponseDTO> authenticateAndGetToken(@RequestBody AuthLoginRequestDTO authRequest) {
//        Authentication authentication = authenticationManager
//                .authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(),
//                        authRequest.getPassword()));
//
//        if (authentication.isAuthenticated()) {
//            AuthenticationResponseDTO responseDTO = authenticationService.getUserAuthResponse(authRequest.getEmail(), "Login successfully");
//            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
//        } else {
//            throw new ResourceNotFoundException("Invalid user request");
//        }
//    }

}
