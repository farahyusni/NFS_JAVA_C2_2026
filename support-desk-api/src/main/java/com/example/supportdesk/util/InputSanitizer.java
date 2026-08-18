package com.example.supportdesk.util;

/*
Validation: decides whether input is allowed at all - reject it if invalid
Sanitisation: cleans input that is already allowed, before it's saved

"  Printer jam  " -> "Printer jam"        (trim)
empty description  -> null                (so @NotBlank still rejects it, not saved as "")
"low"              -> "LOW"               (normalise code-like fields such as priority/status)
<script> in title  -> reject, do not silently strip and save anyway
*/
public class InputSanitizer {

    private InputSanitizer() {
    }

    public static String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    public static String cleanText(String value) {
        String trimmed = trimToNull(value);
        if (trimmed == null) {
            return null;
        }

        return trimmed
                .replaceAll("\\p{Cntrl}", "")   // remove control characters (stray tabs/nulls from copy-paste)
                .replaceAll("\\s+", " ")        // collapse repeated whitespace into a single space
                .trim();
    }

    public static String normalizeCode(String value) {
        String cleaned = cleanText(value);
        return cleaned == null ? null : cleaned.toUpperCase();
    }
}
