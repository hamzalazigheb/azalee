# Quick Start - Production Deployment

## 🚀 5-Minute Production Setup

### Step 1: Generate JWT Secret (30 seconds)
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output - you'll need it for `.env.production`

### Step 2: Create Environment File (1 minute)
Create `.env.production` in project root:

```env
# CRITICAL - Use the secret you just generated
JWT_SECRET=paste-your-generated-secret-here

# Your MongoDB connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/azalee_db

# Your domain
NEXT_PUBLIC_APP_URL=https://azalee-patrimoine.fr

NODE_ENV=production
```

### Step 3: Create Admin User (2 minutes)
```bash
node scripts/create-admin.js
```

Follow the prompts:
- **Email**: Your admin email
- **Password**: At least 12 characters, with uppercase, lowercase, number, and special char
- **Name**: Your full name

**Example strong password**: `Azalee@2026!Secure`

### Step 4: Build & Deploy (2 minutes)
```bash
# Stop existing containers
docker-compose down

# Build with new security fixes
docker-compose build --no-cache

# Start containers
docker-compose up -d

# Check logs
docker-compose logs -f frontend
```

### Step 5: Verify (30 seconds)
1. Visit `https://azalee-patrimoine.fr/admin/login`
2. Login with your admin credentials
3. ✅ You're done!

---

## ⚠️ Common Issues & Solutions

### Issue: "JWT_SECRET environment variable is required"
**Solution**: Make sure `.env.production` exists and has a valid JWT_SECRET

### Issue: "Password must be at least 12 characters"
**Solution**: Use a stronger password with:
- Minimum 12 characters
- At least one uppercase (A-Z)
- At least one lowercase (a-z)
- At least one number (0-9)
- At least one special character (@$!%*?&)

### Issue: "Too many requests"
**Solution**: Rate limiting is working! Wait 15 minutes and try again.

### Issue: Can't create admin user
**Solution**: 
1. Check MongoDB is running: `docker-compose ps`
2. Check MongoDB connection in `.env.production`
3. Try: `docker-compose restart mongo`

---

## 🔐 Security Features Enabled

✅ JWT token validation (no default fallback)  
✅ Rate limiting on login (5 attempts per 15 min)  
✅ Rate limiting on contact form (10 per hour)  
✅ Input validation with Zod  
✅ Strong password requirements (12+ chars)  
✅ Console.log removed in production  
✅ No default admin credentials  

---

## 📋 Pre-Deployment Checklist

- [ ] Generated strong JWT_SECRET (32+ characters)
- [ ] Created `.env.production` with all required variables
- [ ] Created admin user with strong password
- [ ] Tested MongoDB connection
- [ ] Built Docker images successfully
- [ ] Containers are running (`docker-compose ps`)
- [ ] Can access admin login page
- [ ] Can login with admin credentials

---

## 🆘 Need Help?

1. Check logs: `docker-compose logs -f frontend`
2. Check MongoDB: `docker-compose logs -f mongo`
3. Restart services: `docker-compose restart`
4. Full reset: `docker-compose down && docker-compose up -d`

For detailed information, see `PRODUCTION_SECURITY_FIXES.md`





