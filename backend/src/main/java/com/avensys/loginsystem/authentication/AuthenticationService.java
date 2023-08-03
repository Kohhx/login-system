package com.avensys.loginsystem.authentication;

import com.avensys.loginsystem.jwt.JwtService;
import com.avensys.loginsystem.role.Role;
import com.avensys.loginsystem.role.RoleRepository;
import com.avensys.loginsystem.user.User;
import com.avensys.loginsystem.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(UserRepository userRepository, RoleRepository roleRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
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
