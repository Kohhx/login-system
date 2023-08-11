package com.avensys.loginsystem.oauth;

import com.avensys.loginsystem.authentication.RegistrationResponseDTO;
import com.avensys.loginsystem.jwt.JwtService;
import com.avensys.loginsystem.role.Role;
import com.avensys.loginsystem.role.RoleRepository;
import com.avensys.loginsystem.user.User;
import com.avensys.loginsystem.user.UserRepository;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;

//@Service
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final OAuth2AuthorizedClientService authorizedClientService;


    public OAuth2UserService(UserRepository userRepository, RoleRepository roleRepository, JwtService jwtService, OAuth2AuthorizedClientService authorizedClientService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.authorizedClientService = authorizedClientService;
    }

    public RegistrationResponseDTO oauthSignUp (OAuth2AuthenticationToken authToken) {
        OAuth2AuthorizedClient authorizedClient = getAuthorizedClient(authToken);

//        OAuth2User oAuth2User = authorizedClient.();

        return null;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        return processOAuth2User(oAuth2User);
    }

    private OAuth2User processOAuth2User(OAuth2User oAuth2User) {
        // Extract user details from the OAuth2User object and create or update the User entity.
        String email = oAuth2User.getAttribute("email");
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");
        // You can extract more information like profile image URL if required.

        User user = userRepository.findByUsername(email).orElse(null);

        if (user == null) {
            // Create a new User entity for Google OAuth sign-up if the user doesn't exist.
            user = new User();
            user.setUsername(email);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            Role roleFound = roleRepository.findRolesByName("USER_ROLE");
            user.addRole(roleFound);
            // Set any other required attributes for the user.
        }
        User userSaved = userRepository.save(user);

        String token = jwtService.generateToken(userSaved.getUsername());

//        return new RegistrationResponseDTO(
//                "User registered successfully",
//                userSaved.getId(),
//                userSaved.getFirstName(),
//                userSaved.getLastName(),
//                userSaved.getUsername(),
//                token,
//                userSaved.getRolesList()
//        );

        // Return the user details as an OAuth2User.
        // You can create a custom OAuth2User implementation if needed.
        return oAuth2User;
    }

    private OAuth2AuthorizedClient getAuthorizedClient(OAuth2AuthenticationToken authToken) {
        String clientRegistrationId = authToken.getAuthorizedClientRegistrationId();
        String principalName = authToken.getName();
        return authorizedClientService.loadAuthorizedClient(clientRegistrationId, principalName);
    }

}
