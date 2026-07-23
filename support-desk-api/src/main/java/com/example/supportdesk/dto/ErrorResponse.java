package com.example.supportdesk.dto;

import java.util.List;

public class ErrorResponse {
    private final String message;
    private final List<FieldErrorDetail> errors;

    public ErrorResponse(String message) {
        this.message = message;
        this.errors = List.of();
    }

    public ErrorResponse(String message, List<FieldErrorDetail> errors) {
        this.message = message;
        this.errors = errors;
    }

    public String getMessage() {
        return message;
    }

    public List<FieldErrorDetail> getErrors() {
        return errors;
    }
}
