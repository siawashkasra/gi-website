# Local media admin

## Requirements

- **Node.js** on the server with a **writable filesystem** for `data/site-media.db` and `public/uploads/`. Serverless hosts with read-only or ephemeral disks (typical Vercel serverless) are not suitable unless you move the database and files to attached storage or a remote service.
- **Environment variables** (see below) on every environment that runs the app.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `ADMIN_PASSWORD` | Plaintext password for marketing sign-in. Compared using SHA-256 in a timing-safe check (both input and env value are hashed). |
| `SESSION_SECRET` | Secret for signing the admin JWT cookie (minimum 16 characters). |

Optional:

| Variable | Purpose |
|----------|---------|
| `SQLITE_URL` | SQLite database path as `file:/absolute/path/to/site-media.db`. If unset, defaults to `data/site-media.db` under the project root. |

## Using the admin

1. Deploy or run `npm run dev` with the env vars set.
2. Open `/admin/login` and sign in.
3. Use the sidebar: **Page heroes**, **Home sections**, **Projects**, **Companies**, **Team**. Each slot can **Upload and assign** (requires alt text) or **Clear override** to restore the built-in static image from the repo.

Uploaded files are stored under `public/uploads/` and referenced by the SQLite `assets` and `placements` tables.

## Backups

- Copy the database file: e.g. `cp data/site-media.db backups/site-media-$(date +%F).db`.
- Copy `public/uploads/` if you rely on uploaded binaries (or rely on server snapshots).

## Cache

Public pages read placements through a tagged cache (`media`). Saving or clearing a placement triggers `revalidateTag("media")` so changes appear without restarting the app.

## Security notes

- Restrict `/admin` and `/api/admin` by network policy if possible (VPN, IP allowlist, or internal hostname).
- Use a long random `SESSION_SECRET` and a strong `ADMIN_PASSWORD`.
- The login route applies basic rate limiting per IP.
