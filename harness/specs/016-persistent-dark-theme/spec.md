# Persistent account theme

## Objective

Allow every authenticated HAIC user to choose a light, dark or system-controlled appearance from their profile and preserve that preference across navigation and devices.

## Requirements

- Store `light`, `dark` or `system` on the user record; default to `system`.
- Expose a protected endpoint that only updates the active user's theme.
- Apply the chosen theme immediately and before first paint on later navigation.
- Synchronize the persisted account preference after authentication.
- Adapt HOME, blog, article, profile, registration, administration, about and participation surfaces.
- Keep imagery legible and preserve HAIC amber/navy identity.
- Follow operating-system changes while the preference is `system`.

## Acceptance criteria

- Profile offers three accessible radio-style options.
- Anonymous requests cannot update a preference.
- Invalid theme values are rejected.
- The theme remains active while navigating and after reload.
- New accounts default to `system`.
- Lint, tests and production build pass.

