# Verification

- [x] Role model updated to standard/admin/superadmin.
- [x] Editorial permissions restricted to superadmin.
- [x] Blog list and detail require an active member before querying posts.
- [x] HOME omits project components and data for anonymous visitors.
- [x] HOME API rejects anonymous and inactive sessions.
- [x] Legacy-role migration generated, applied locally and inspected.
- [x] Anonymous `/blog` redirects to registration; anonymous `/api/home` returns 401.
- [x] Anonymous HOME renders no project cards.
- [x] Lint passes.
- [x] Automated tests pass (8/8).
- [x] Production build passes.
