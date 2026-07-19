# Session-gated blog access

## Objective

Protect every project surface behind an active HAIC session and simplify roles so ordinary registrations receive standard read access while only superusers can publish.

## Access model

- `standard`: default role for site registrations; can read blog content according to access level.
- `admin`: can manage users, but cannot create or edit blog entries.
- `superadmin`: can manage users and is the only role allowed to create, edit, publish or archive entries.

## Requirements

- Anonymous visitors must not query or mount project cards, videos, counts or project details.
- `/blog` and `/blog/[slug]` require an active session before querying entries.
- `/api/home` rejects anonymous and inactive users.
- The public HOME may explain HAIC and invite registration, but must replace project data with an access prompt.
- Existing legacy roles migrate to `standard` without changing superadmins.

## Acceptance criteria

- New Better Auth users default to `standard` and access level 1.
- Standard users can open the blog and eligible project details.
- Standard and admin users receive 403 from editorial APIs.
- Superadmins retain editorial access.
- Suspended accounts cannot read blog content.

