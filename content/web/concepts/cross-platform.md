# /docs/CROSS_PLATFORM.md

## Targets
- Web experiences must support evergreen Chromium, Firefox, and Safari with graceful degradation for unsupported features.
- Scripts and tooling must run on Windows, macOS, and Linux; avoid shell-specific syntax.

## Rules
- Use POSIX-compatible scripts when possible; provide PowerShell equivalents when required.
- Normalize line endings via .gitattributes; avoid platform-specific paths in code.
- Use feature detection over user-agent sniffing; gate experimental APIs.

## Assets
- Fonts and media must include fallbacks; avoid OS-specific encodings.
- Time, locale, and number handling must use Intl APIs; avoid manual parsing.

## Testing
- Validate behavior on at least two OS platforms or via CI matrices.
