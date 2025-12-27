# Admin Area Setup

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
ADMIN_PASSWORD=13121312
ADMIN_SECRET=change-this-to-a-random-long-string-in-production
```

**Important:**
- `ADMIN_PASSWORD` is the default admin password (13121312)
- After first login, the password is stored hashed in the database
- `ADMIN_SECRET` should be a long random string in production (used for session tokens)

## First Time Setup

1. The admin config is automatically initialized on first use
2. Default password is `13121312` (from `ADMIN_PASSWORD` env var)
3. After login, you can change the password from the admin dashboard

## Features

### Admin Dashboard (`/admin`)
- View all anonymous voices
- Search messages
- Filter by status (All / Approved / Pending / Rejected)
- Sort by date (Newest / Oldest)
- Edit messages
- Delete messages
- Change admin password

### Security
- Passwords are hashed using bcrypt
- HttpOnly cookies for session management
- Secure cookies in production
- All admin routes are protected by middleware

## Access

1. Click the Shield icon in the navbar (top right, next to language switcher)
2. Enter password: `13121312` (default)
3. You'll be redirected to the admin dashboard

## Changing Password

1. Log in to admin dashboard
2. Scroll to "Change Password" section at the bottom
3. Enter:
   - Current password
   - New password (minimum 8 characters)
   - Confirm new password
4. Click "Update Password"

## API Endpoints

All admin API endpoints require authentication:

- `POST /api/admin/login` - Login
- `POST /api/admin/logout` - Logout
- `GET /api/admin/voices` - List voices (with pagination, search, filter)
- `PATCH /api/admin/voices/[id]` - Update voice message
- `DELETE /api/admin/voices/[id]` - Delete voice
- `POST /api/admin/password` - Change password

## Database

The admin system uses a `AdminConfig` table with a singleton record:
- `id`: "singleton" (always)
- `passwordHash`: Hashed password
- `updatedAt`: Last password change
- `createdAt`: Initial creation

