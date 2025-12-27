# Vercel Deployment Guide

## ⚠️ Important: Database Configuration

**SQLite with file-based storage will NOT work on Vercel's serverless functions** because:
- Serverless functions are stateless and isolated
- File system is read-only except for `/tmp` (which doesn't persist)
- Each function invocation is a fresh environment

## Recommended Solutions

### Option 1: Use Vercel Postgres (Recommended)
1. Go to your Vercel project dashboard
2. Navigate to Storage → Create Database → Postgres
3. Copy the connection string
4. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. Run migrations: `npx prisma migrate deploy`
6. Add `DATABASE_URL` to Vercel environment variables

### Option 2: Use Turso (Serverless SQLite)
1. Sign up at [turso.tech](https://turso.tech)
2. Create a database
3. Get connection string
4. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "libsql"
     url      = env("DATABASE_URL")
   }
   ```
5. Install: `npm install @libsql/client`
6. Add `DATABASE_URL` to Vercel environment variables

### Option 3: Use PlanetScale (MySQL)
1. Sign up at [planetscale.com](https://planetscale.com)
2. Create a database
3. Get connection string
4. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }
   ```
5. Add `DATABASE_URL` to Vercel environment variables

## Environment Variables Required

Add these in Vercel Dashboard → Settings → Environment Variables:

- `DATABASE_URL` - Your database connection string
- `ADMIN_PASSWORD` - Default admin password (optional, defaults to "13121312")
- `ADMIN_SECRET` - Secret for signing admin session cookies (required for production)

## Build Configuration

The project is configured with:
- `postinstall` script: Automatically generates Prisma client after `npm install`
- `build` script: Runs `prisma generate` before `next build`
- `next.config.js`: Includes Prisma in external packages for serverless

## Migration Steps

1. **Update Prisma Schema** (choose one database option above)
2. **Update Environment Variables** in Vercel
3. **Run Migrations**:
   ```bash
   npx prisma migrate deploy
   ```
   Or add to Vercel build command:
   ```json
   {
     "buildCommand": "prisma generate && prisma migrate deploy && next build"
   }
   ```

## Current SQLite Setup (Local Development Only)

The current setup uses SQLite for local development. For production on Vercel, you **must** switch to one of the database options above.

## Troubleshooting

### Build Fails: "Prisma Client not generated"
- Ensure `postinstall` script runs: Check build logs
- Manually add to build command: `prisma generate && next build`

### Database Connection Errors
- Verify `DATABASE_URL` is set in Vercel environment variables
- Check database connection string format
- Ensure database is accessible from Vercel's IP ranges

### Migration Errors
- Run `npx prisma migrate deploy` manually
- Check migration files are committed to git
- Verify database schema matches migrations

