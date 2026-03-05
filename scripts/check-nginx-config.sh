#!/bin/bash

# Script to check Nginx configuration and connectivity

echo "🔍 Checking Nginx configuration..."
echo ""

# 1. Test Nginx configuration
echo "1️⃣ Testing Nginx configuration syntax..."
sudo nginx -t
echo ""

# 2. Check if Nginx is running
echo "2️⃣ Checking Nginx status..."
sudo systemctl is-active nginx
echo ""

# 3. Check ports
echo "3️⃣ Checking which ports are listening..."
echo "Port 80:"
sudo netstat -tlnp | grep :80 || sudo ss -tlnp | grep :80
echo ""
echo "Port 443:"
sudo netstat -tlnp | grep :443 || sudo ss -tlnp | grep :443
echo ""
echo "Port 3001 (Docker):"
sudo netstat -tlnp | grep :3001 || sudo ss -tlnp | grep :3001
echo ""

# 4. Check SSL certificate
echo "4️⃣ Checking SSL certificate..."
if [ -f /etc/letsencrypt/live/azalee-patrimoine.fr/fullchain.pem ]; then
    echo "✅ Certificate exists"
    sudo ls -lh /etc/letsencrypt/live/azalee-patrimoine.fr/
    echo ""
    echo "Certificate details:"
    sudo openssl x509 -in /etc/letsencrypt/live/azalee-patrimoine.fr/fullchain.pem -noout -subject -dates
else
    echo "❌ Certificate not found!"
fi
echo ""

# 5. Check Nginx configuration file
echo "5️⃣ Checking Nginx site configuration..."
if [ -f /etc/nginx/sites-available/azalee-patrimoine.fr ]; then
    echo "✅ Configuration file exists"
    echo "Checking SSL paths..."
    grep -E "ssl_certificate|ssl_certificate_key" /etc/nginx/sites-available/azalee-patrimoine.fr
else
    echo "❌ Configuration file not found!"
fi
echo ""

# 6. Test local Docker connection
echo "6️⃣ Testing Docker frontend on port 3001..."
curl -I http://localhost:3001 2>&1 | head -5
echo ""

# 7. Check Nginx error logs
echo "7️⃣ Recent Nginx errors (last 10 lines)..."
sudo tail -10 /var/log/nginx/error.log
echo ""

# 8. Check Nginx access logs
echo "8️⃣ Recent Nginx access (last 5 lines)..."
sudo tail -5 /var/log/nginx/access.log 2>/dev/null || echo "No access log found"
echo ""

echo "✅ Check complete!"

