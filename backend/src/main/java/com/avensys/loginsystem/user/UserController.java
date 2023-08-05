package com.avensys.loginsystem.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/v1/user")
    public ResponseEntity<UserResponseDTO> getUserInfo() {
        UserResponseDTO userResponse = userService.getUserInfo();
        return ResponseEntity.ok(userResponse);
    }

    @PatchMapping("/api/v1/user/{id}")
    public ResponseEntity<UserUpdateResponseDTO> updateUserRole(@RequestBody UserUpdateRequestDTO userUpdateRequest, @PathVariable long id) {
        UserUpdateResponseDTO userResponse = userService.updateUserRole(id, userUpdateRequest);
        return ResponseEntity.ok(userResponse);
    }
}
