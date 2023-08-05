package com.avensys.loginsystem.user;

import com.avensys.loginsystem.DTO.MessageDTO;
import com.avensys.loginsystem.exceptions.ResourceAccessDeniedException;
import com.avensys.loginsystem.exceptions.ResourceNotFoundException;
import com.avensys.loginsystem.jwt.JwtService;
import com.avensys.loginsystem.role.Role;
import com.avensys.loginsystem.role.RoleRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
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

    public UserUpdateResponseDTO updateUser(long id, UserUpdateRequestDTO userUpdateRequest) {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) {
            throw new ResourceNotFoundException("User not found");
        }

        User userToUpdate = user.get();

        updateUser(userToUpdate, userUpdateRequest, false);

//        userToUpdate.setFirstName(userUpdateRequest.firstName());
//        userToUpdate.setLastName(userUpdateRequest.lastName());
//        userToUpdate.setUsername(userUpdateRequest.username());
//        userToUpdate.setPassword(passwordEncoder.encode(userUpdateRequest.password()));

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

    public List<UserResponseDTO> getAllUsers() {
        // Check if the user is a manager
        if (!checkIsManager()) {
            throw new ResourceAccessDeniedException("You are not authorized to perform this action");
        }

        // Get all users
        List<User> users = userRepository.findAll();

        // Map users to UserResponseDTO
        return users.stream().map(this::userToUserResponseDTO).toList();
    }

    public MessageDTO deleteUser(long id) {
        // Check if the user is a manager
        if (!checkIsManager()) {
            throw new ResourceAccessDeniedException("You are not authorized to perform this action");
        }

        // Delete user
        userRepository.deleteById(id);

        return new MessageDTO("User deleted successfully");
    }

    public MessageDTO updateUserAndRole(long id, UserUpdateRequestDTO userUpdateRequest) {
        if (!checkIsManager()) {
            throw new ResourceAccessDeniedException("You are not authorized to perform this action");
        }

        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) {
            throw new ResourceNotFoundException("User not found");
        }

        User userToUpdate = user.get();

        updateUser(userToUpdate, userUpdateRequest, true);
        User userSaved = userRepository.save(userToUpdate);
        if (userSaved == null) {
            throw new RuntimeException("Error saving user");
        }

        return new MessageDTO("User updated successfully");
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

    private boolean checkIsManager() {
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_MANAGER"));
    }

    private void updateUser(User user, UserUpdateRequestDTO userUpdateRequest, boolean updateRole) {
        user.setFirstName(userUpdateRequest.firstName());
        user.setLastName(userUpdateRequest.lastName());
        user.setUsername(userUpdateRequest.username());
        user.setPassword(passwordEncoder.encode(userUpdateRequest.password()));

        if (updateRole) {
            user.getRoles().clear();
            userUpdateRequest.roles().stream().forEach(role -> {
                System.out.println(role);
                Role roleFound = roleRepository.findRolesByName(role);
                user.addRole(roleFound);
            });
        }
    }


}
