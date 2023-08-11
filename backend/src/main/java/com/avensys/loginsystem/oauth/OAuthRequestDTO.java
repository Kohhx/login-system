package com.avensys.loginsystem.oauth;

public record OAuthRequestDTO(
        String  credential,
        String clientId
) {
}
