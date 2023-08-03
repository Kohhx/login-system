package com.avensys.loginsystem.exceptions;

public class InvalidCredentialException extends GlobalException{
    public InvalidCredentialException(String message) {
        super(message);
    }

    public InvalidCredentialException(String message, boolean includeStackTrace) {
        super(message, includeStackTrace);
    }
}
