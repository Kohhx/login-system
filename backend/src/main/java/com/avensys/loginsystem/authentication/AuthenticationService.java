package com.avensys.loginsystem.authentication;

import com.avensys.loginsystem.exceptions.DuplicateResourceException;
import com.avensys.loginsystem.exceptions.InvalidCredentialException;
import com.avensys.loginsystem.jwt.JwtService;
import com.avensys.loginsystem.oauth.OAuthRequestDTO;
import com.avensys.loginsystem.role.Role;
import com.avensys.loginsystem.role.RoleRepository;
import com.avensys.loginsystem.user.User;
import com.avensys.loginsystem.user.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.Collections;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    @Value("${GOOGLE.CLIENT_ID}")
    private String googleClientId;

    public AuthenticationService(UserRepository userRepository, RoleRepository roleRepository, JwtService jwtService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public RegistrationResponseDTO signUpUser(RegistrationRequestDTO registrationRequest) {
        if (userRepository.existsByUsername(registrationRequest.username())) {
            throw new DuplicateResourceException("Username already exist!");
        }

        User userSaved = saveUser(registrationRequest);
        if (userSaved == null) {
            throw new RuntimeException("Error saving user");
        }
        String token = jwtService.generateToken(userSaved.getUsername());
        return new RegistrationResponseDTO(
                "User registered successfully",
                userSaved.getId(),
                userSaved.getFirstName(),
                userSaved.getLastName(),
                userSaved.getUsername(),
                token,
                userSaved.getRolesList()
        );
    }

//    public RegistrationResponseDTO signUpUserOAuth(RegistrationRequestDTO registrationRequest) {
//        if (userRepository.existsByUsername(registrationRequest.username())) {
//            throw new DuplicateResourceException("Username already exist!");
//        }
//
//        User userSaved = saveUserWithNoPassword(registrationRequest);
//        if (userSaved == null) {
//            throw new RuntimeException("Error saving user");
//        }
//        String token = jwtService.generateToken(userSaved.getUsername());
//        return new RegistrationResponseDTO(
//                "User registered successfully",
//                userSaved.getId(),
//                userSaved.getFirstName(),
//                userSaved.getLastName(),
//                userSaved.getUsername(),
//                token,
//                userSaved.getRolesList()
//        );
//    }

//    public RegistrationResponseDTO signUpUserOAuth(OAuthRequestDTO oAuthRequest) {
//
//        System.out.println(oAuthRequest.clientId());
//        System.out.println(oAuthRequest.credential());
//
//        String email="";
//        String firstName="";
//        String lastName="";
//        try {
//            Claims claims = Jwts.parserBuilder()
//                    .setSigningKey(oAuthRequest.clientId().getBytes()) // Use the actual client ID as the signing key
//                    .build()
//                    .parseClaimsJws(oAuthRequest.credential())
//                    .getBody();
//            System.out.println(claims);
//
////            email = claims.get("email", String.class);
////            firstName = claims.get("first_name", String.class);
////            lastName = claims.get("first_name", String.class);
//        } catch (Exception e) {
//            throw new InvalidCredentialException("Invalid Google OAuth token");
//        }
//
//        if (userRepository.existsByUsername(email)) {
//            throw new DuplicateResourceException("Username already exist!");
//        }
//
//        GoogleRequestDTO googleRequest = new GoogleRequestDTO(
//                firstName,
//                lastName,
//                email,
//                "password",
//                new String[]{"ROLE_USER"}
//        );
//
//        User userSaved = saveUserGoogle(googleRequest);
//
//        if (userSaved == null) {
//            throw new RuntimeException("Error saving user");
//        }
//        String token = jwtService.generateToken(userSaved.getUsername());
//        return new RegistrationResponseDTO(
//                "User registered successfully",
//                userSaved.getId(),
//                userSaved.getFirstName(),
//                userSaved.getLastName(),
//                userSaved.getUsername(),
//                token,
//                userSaved.getRolesList()
//        );
//    }

    public RegistrationResponseDTO signUpUserOAuth(OAuthRequestDTO oAuthRequest) {
        GoogleRequestDTO googleRequest = verifyAndExtractUserDetailsOAuth(oAuthRequest, true);

        User userSaved = saveUser(new RegistrationRequestDTO(
                googleRequest.firstName(),
                googleRequest.lastName(),
                googleRequest.username(),
                "password",
                new String[]{"ROLE_USER"}
        ));

        if (userSaved == null) {
            throw new RuntimeException("Error saving user");
        }
        String token = jwtService.generateToken(userSaved.getUsername());
        return new RegistrationResponseDTO(
                "User registered successfully",
                userSaved.getId(),
                userSaved.getFirstName(),
                userSaved.getLastName(),
                userSaved.getUsername(),
                token,
                userSaved.getRolesList()
        );
    }

    public LoginResponseDTO loginUser(LoginRequestDTO loginRequest) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.username(),
                            loginRequest.password()));
            User user = userRepository.findByUsername(loginRequest.username()).get();
            String token = jwtService.generateToken(user.getUsername());
            return new LoginResponseDTO(
                    "User logged in successfully",
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getUsername(),
                    token,
                    user.getRolesList()
            );
        } catch (Exception e) {
            throw new InvalidCredentialException("Invalid user credential");
        }
    }

    public LoginResponseDTO loginUserOAuth(OAuthRequestDTO oAuthRequest) {
        GoogleRequestDTO googleRequest = verifyAndExtractUserDetailsOAuth(oAuthRequest, false);

        User user = userRepository.findByUsername(googleRequest.username()).get();
        String token = jwtService.generateToken(user.getUsername());
        return new LoginResponseDTO(
                "User logged in successfully",
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                token,
                user.getRolesList()
        );
    }

    private User saveUser(RegistrationRequestDTO registrationRequest) {
        User user = new User();
        user.setUsername(registrationRequest.username());
        user.setPassword(passwordEncoder.encode(registrationRequest.password()));
        user.setFirstName(registrationRequest.firstName());
        user.setLastName(registrationRequest.lastName());
        if (registrationRequest.roles() == null) {
            addRoles(user, new String[]{"ROLE_USER"});
        } else {
            addRoles(user, registrationRequest.roles());
        }

        return userRepository.save(user);
    }

//    private User saveUserGoogle(GoogleRequestDTO registrationRequest) {
//        User user = new User();
//        user.setUsername(registrationRequest.username());
//        user.setPassword(passwordEncoder.encode(registrationRequest.password()));
//        user.setFirstName(registrationRequest.firstName());
//        user.setLastName(registrationRequest.lastName());
//        if (registrationRequest.roles() == null) {
//            addRoles(user, new String[]{"ROLE_USER"});
//        } else {
//            addRoles(user, registrationRequest.roles());
//        }
//
//        return userRepository.save(user);
//    }

    private User saveUserWithNoPassword(RegistrationRequestDTO registrationRequest) {
        User user = new User();
        user.setUsername(registrationRequest.username());
//        user.setPassword(passwordEncoder.encode(registrationRequest.password()));
        user.setFirstName(registrationRequest.firstName());
        user.setLastName(registrationRequest.lastName());
        if (registrationRequest.roles() == null) {
            addRoles(user, new String[]{"ROLE_USER"});
        } else {
            addRoles(user, registrationRequest.roles());
        }

        return userRepository.save(user);
    }

    private GoogleRequestDTO verifyAndExtractUserDetailsOAuth(OAuthRequestDTO oAuthRequest, boolean isSignup) {
        String email = "";
        String firstName = "";
        String lastName = "";
        System.out.println("GoodleClient" + googleClientId);
        String clientId = googleClientId;
        if (oAuthRequest.clientId() != null && !oAuthRequest.clientId().isEmpty()) {
            clientId = oAuthRequest.clientId();
        }
        HttpTransport transport = new NetHttpTransport();
        GsonFactory gsonFactory = GsonFactory.getDefaultInstance();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, gsonFactory)
                .setAudience(Collections.singletonList(clientId))
                .build();

        GoogleIdToken idToken = null;
        try {
            idToken = verifier.verify(oAuthRequest.credential());
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            email = payload.getEmail();
            firstName = (String) payload.get("given_name");
            lastName = (String) payload.get("family_name");
        } else {
            throw new InvalidCredentialException("Invalid Google OAuth token");
        }

        if (isSignup && userRepository.existsByUsername(email)) {
            throw new DuplicateResourceException("Username already exist!");
        }

        GoogleRequestDTO googleRequest = new GoogleRequestDTO(
                firstName,
                lastName,
                email
        );

        return googleRequest;

    }

    private void addRoles(User user, String[] roles) {
        Arrays.stream(roles).forEach(role -> {
            System.out.println(role);
            Role roleFound = roleRepository.findRolesByName(role);
            user.addRole(roleFound);
        });
    }

}
