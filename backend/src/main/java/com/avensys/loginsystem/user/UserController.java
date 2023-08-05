package com.avensys.loginsystem.user;

import com.avensys.loginsystem.DTO.MessageDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Get own user info endpoint
    @PreAuthorize("hasAnyRole('ROLE_MANAGER', 'ROLE_USER')")
    @GetMapping("/api/v1/user")
    public ResponseEntity<UserResponseDTO> getUserInfo() {
        UserResponseDTO userResponse = userService.getUserInfo();
        return ResponseEntity.ok(userResponse);
    }

    // Update user endpoint
    @PreAuthorize("hasAnyRole('ROLE_MANAGER', 'ROLE_USER')")
    @PutMapping("/api/v1/users/{id}")
    public ResponseEntity<UserUpdateResponseDTO> updateUser(@RequestBody UserUpdateRequestDTO userUpdateRequest, @PathVariable long id) {
        UserUpdateResponseDTO userResponse = userService.updateUser(id, userUpdateRequest);
        return ResponseEntity.ok(userResponse);
    }

    /**
     * Manager Endpoints
     */
    // Get all users endpoint
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    @GetMapping("/api/v1/users")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> userResponses = userService.getAllUsers();
        return ResponseEntity.ok(userResponses);
    }

    // Delete user endpoint
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    @DeleteMapping("/api/v1/users/{id}")
    public ResponseEntity<MessageDTO> deleteUser(@PathVariable long id) {
        MessageDTO messageResponse = userService.deleteUser(id);
        return ResponseEntity.ok(messageResponse);
    }

    // Manager update with role change endpoint
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    @PutMapping("/api/v1/users/{id}/update")
    public ResponseEntity<MessageDTO> updateUserAndRole(@RequestBody UserUpdateRequestDTO userUpdateRequest, @PathVariable long id) {
        MessageDTO messageResponse = userService.updateUserAndRole(id, userUpdateRequest);
        return ResponseEntity.ok(messageResponse);
    }
}
