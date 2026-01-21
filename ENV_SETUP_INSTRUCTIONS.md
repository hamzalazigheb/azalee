# Environment Setup - URGENT

## Your Login Issue

You're getting disconnected because the JWT_SECRET is not properly set in your `.env.local` file.

## Quick Fix (Do This Now):

### Step 1: Check if `.env.local` exists

Open your project folder and look for `.env.local` file in the root directory.

### Step 2: Create or Update `.env.local`

Create a file named `.env.local` in your project root with this content:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/azalee_db

# JWT Secret - CRITICAL!
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:4028

# Node Environment
NODE_ENV=development
```

### Step 3: Restart Your Server

1. Stop the server (Ctrl+C in terminal)
2. Start it again: `npm run dev`
3. Try logging in again

## Why This Happens

The JWT token is being created with one secret during login, but when verifying, it's trying to use a different (or missing) secret, causing the token to be invalid.

## For Production

Generate a strong random secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then use that in your `.env.production` file.

---

**After fixing this, your login should work perfectly!** ✅





