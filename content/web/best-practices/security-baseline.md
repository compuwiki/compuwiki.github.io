# /docs/SECURITY_BASELINE.md

## Principles
- Default deny: minimize exposed surface and apply least privilege to APIs, storage, and credentials.
- Validate and sanitize all inputs; never trust client-provided data.
- No secrets in the repository; use environment variables or secret storage and rotate on suspicion.

## Web
- Enforce a Content Security Policy; disallow inline scripts/styles unless hashed and documented.
- Use HTTPS-only resources; no mixed content.
- Encode or escape data before injecting into the DOM; avoid innerHTML with untrusted content.

## Dependencies
- Pin versions with lockfiles; review transitive risks.
- Remove unused dependencies; prefer standard APIs over third-party code.

## Authentication and authorization
- Check authorization on every sensitive action; do not rely on UI state.
- Avoid storing tokens in localStorage; prefer HttpOnly cookies when applicable.

## Logging
- Log security events without leaking secrets; scrub PII before persistence.
