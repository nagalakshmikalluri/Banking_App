package net.javaguides.banking_app.exception;

import java.io.Serializable;
import java.time.LocalDateTime;

public record ErrorDetails(LocalDateTime timestamp,
                           String message,
                           String details,
                           String errorCode) {
}
