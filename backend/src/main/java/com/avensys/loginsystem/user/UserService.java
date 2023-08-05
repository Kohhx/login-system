package com.avensys.loginsystem.user;

import com.avensys.loginsystem.exceptions.ResourceNotFoundException;
import com.avensys.loginsystem.jwt.JwtService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public UserResponseDTO getUserInfo() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> user = userRepository.findByUsername(principal.getName());
        if (user.isPresent()) {
            return userToUserResponseDTO(user.get());
        } else {
            throw new ResourceNotFoundException("User not found");
        }
    }

    private UserResponseDTO userToUserResponseDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getRolesList()
        );
    }

    public UserUpdateResponseDTO updateUserRole(long id, UserUpdateRequestDTO userUpdateRequest) {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) {
            throw new ResourceNotFoundException("User not found");
        }
        User userToUpdate = user.get();
        userToUpdate.setFirstName(userUpdateRequest.firstName());
        userToUpdate.setLastName(userUpdateRequest.lastName());
        userToUpdate.setUsername(userUpdateRequest.username());
        userToUpdate.setPassword(passwordEncoder.encode(userUpdateRequest.password()));
//        userToUpdate.setRolesList(userToUpdate.getRolesList().equals("free") ? "premium" : "free");
        User userSaved = userRepository.save(userToUpdate);
        if (userSaved == null) {
            throw new RuntimeException("Error saving user");
        }
        String token = jwtService.generateToken(userSaved.getUsername());
        return new UserUpdateResponseDTO(
                "User updated successfully",
                userToUpdate.getId(),
                userToUpdate.getFirstName(),
                userToUpdate.getLastName(),
                userToUpdate.getUsername(),
                token,
                userToUpdate.getRolesList()
        );
    }
}
