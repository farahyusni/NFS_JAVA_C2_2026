# Day 17 Security Hardening Evidence — Support Desk Ticket API

## 1. Authentication evidence

Test performed:

```http
GET /api/tickets
(no Authorization header)
```

Expected result: `401 Unauthorized`

Evidence:

```text
HTTP/1.1 401
WWW-Authenticate: Bearer resource_metadata="http://localhost:8080/.well-known/oauth-protected-resource"
```

Enforced by `anyRequest().authenticated()` in `SecurityConfig.java`.

## 2. Authorisation evidence

Test performed:

```http
POST /api/tickets
Authorization: Bearer <USER-role token>
```

Expected result: `403 Forbidden`

Evidence:

```text
HTTP/1.1 403
WWW-Authenticate: Bearer error="insufficient_scope", error_description="The request requires higher privileges than provided by the access token."
```

Enforced by `SecurityConfig.java` — `.requestMatchers(HttpMethod.POST, "/api/tickets").hasRole("ADMIN")`. The USER token is authenticated but lacks the required role.

## 3. Duplicate protection evidence

Test performed:

```http
POST /api/auth/register
{ "email": "day9demo@example.com", ... }   (already registered)
```

Expected result: `409 Conflict`

Evidence:

```text
HTTP/1.1 409
{
  "errors": [],
  "message": "Email already exists: day9demo@example.com"
}

requestId=3fd25646 method=POST path=/api/auth/register status=409 durationMs=54
```

Enforced by `AuthService`, which checks for an existing user by email before creating one and throws `DuplicateResourceException`, mapped to 409 by `GlobalExceptionHandler`.

## 4. Input validation evidence

Test performed:

```http
POST /api/tickets
Authorization: Bearer <ADMIN token>
{ "title": "", "description": "", "category": "", "priority": "", "createdBy": "" }
```

Expected result: `400 Bad Request`

Evidence:

```text
HTTP/1.1 400
{
  "errors": [
    { "field": "title", "message": "Title is required" },
    { "field": "priority", "message": "Priority is required" },
    { "field": "createdBy", "message": "Created by is required" },
    { "field": "category", "message": "Category is required" },
    { "field": "description", "message": "Description is required" }
  ],
  "message": "Validation failed"
}

requestId=608d0eb2 method=POST path=/api/tickets status=400 durationMs=56
```

Enforced by `@NotBlank` on `CreateTicketRequest`, caught by `GlobalExceptionHandler.handleValidationError`.

## 5. Logging evidence

Confirmed by reading the actual logging code, not just the output:

- **`RequestTimingFilter.java`** only reads `httpRequest.getMethod()`, `httpRequest.getRequestURI()`, and `httpResponse.getStatus()` — it never touches the `Authorization` header or the request body, so there is no code path where a token could end up in a log line.
- **`GlobalExceptionHandler.java`** has no logger calls at all — it only returns structured `ErrorResponse` objects. Notably, `handleAuthenticationFailure` returns a fixed `"Invalid email or password"` message rather than echoing back the submitted password.
- Real safe log examples captured this session (no token, no password, no request body anywhere):
  ```text
  requestId=6c33babd method=GET path=/api/tickets/T999 status=404 durationMs=71
  requestId=608d0eb2 method=POST path=/api/tickets status=400 durationMs=56
  requestId=3fd25646 method=POST path=/api/auth/register status=409 durationMs=54
  ```

## 6. Docker/secret hygiene evidence

```text
$ git ls-files | grep -i "\.env"
.env.example

$ grep -n "env" .gitignore
71:.env
72:.env.*
73:!.env.example
74:*.env
```

Only `.env.example` (a template with no real values) is tracked. The root `.gitignore` explicitly excludes `.env`, `.env.*`, and `*.env`, with a single carve-out for `.env.example`. No real `.env` file exists anywhere in the working tree (`find . -iname ".env*"` returns only `.env.example`), so there is nothing containing real secrets to accidentally commit in the first place.