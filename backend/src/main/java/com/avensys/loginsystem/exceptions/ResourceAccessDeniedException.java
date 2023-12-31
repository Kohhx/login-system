package com.avensys.loginsystem.exceptions;

public class ResourceAccessDeniedException extends GlobalException {

    public ResourceAccessDeniedException(String message) {
        super(message);
    }

    public ResourceAccessDeniedException(String message, boolean includeStackTrace) {
        super(message, includeStackTrace);
    }
}
