#!/bin/bash

# Script to test the deployment

DOMAIN="azalee-patrimoine.fr"

echo "🧪 Testing deployment for $DOMAIN"
echo ""

# Test 1: Check Nginx status
echo "1️⃣ Checking Nginx status..."
sudo systemctl status nginx --no-pager -l | head -10
echo ""

# Test 2: Check Docker containers
echo "2️⃣ Checking Docker containers..."
sudo docker-compose ps
echo ""

# Test 3: Test HTTP (should redirect to HTTPS)
echo "3️⃣ Testing HTTP (should redirect to HTTPS)..."
curl -I http://$DOMAIN 2>&1 | head -5
echo ""

# Test 4: Test HTTPS
echo "4️⃣ Testing HTTPS..."
curl -I https://$DOMAIN 2>&1 | head -10
echo ""

# Test 5: Test www subdomain
echo "5️⃣ Testing www subdomain..."
curl -I https://www.$DOMAIN 2>&1 | head -10
echo ""

# Test 6: Check SSL certificate
echo "6️⃣ Checking SSL certificate..."
sudo certbot certificates | grep -A 5 "$DOMAIN"
echo ""

# Test 7: Check if port 80 is listening
echo "7️⃣ Checking if Nginx is listening on port 80..."
sudo netstat -tlnp | grep :80 || sudo ss -tlnp | grep :80
echo ""

# Test 8: Check if port 443 is listening
echo "8️⃣ Checking if Nginx is listening on port 443..."
sudo netstat -tlnp | grep :443 || sudo ss -tlnp | grep :443
echo ""

# Test 9: Check if Docker frontend is listening on port 3001
echo "9️⃣ Checking if Docker frontend is listening on port 3001..."
sudo netstat -tlnp | grep :3001 || sudo ss -tlnp | grep :3001
echo ""

# Test 10: Test local connection to Docker
echo "🔟 Testing local connection to Docker frontend..."
curl -I http://localhost:3001 2>&1 | head -5
echo ""

echo "✅ Testing complete!"

