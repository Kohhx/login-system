package com.avensys.loginsystem.authentication;

import com.avensys.loginsystem.jwt.JwtService;
import com.avensys.loginsystem.role.Role;
import com.avensys.loginsystem.role.RoleRepository;
import com.avensys.loginsystem.user.User;
import com.avensys.loginsystem.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, RoleRepository roleRepository, JwtService jwtService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public RegistrationResponseDTO signUpUser(RegistrationRequestDTO registrationRequest) {
        if (userRepository.existsByUsername(registrationRequest.username())) {
//            throw new DuplicateResourceException("Email already exist!");
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

    public LoginResponseDTO loginUser(LoginRequestDTO loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.username(),
                        loginRequest.password()));

        if (authentication.isAuthenticated()) {
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
        } else {
            throw new ResourceNotFoundException("Invalid user request");
        }
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

    private void addRoles(User user, String[] roles) {
        Arrays.stream(roles).forEach(role -> {
            System.out.println(role);
            Role roleFound = roleRepository.findRolesByName(role);
            user.addRole(roleFound);
        });
    }

}
