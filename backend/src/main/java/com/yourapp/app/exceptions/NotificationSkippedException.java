package com.yourapp.app.exceptions;

public class NotificationSkippedException extends RuntimeException {
    public NotificationSkippedException(String message) {
        super(message);
    }

    public NotificationSkippedException(String message, Throwable cause) {
        super(message, cause);
    }
}

