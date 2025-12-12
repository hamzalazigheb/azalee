#!/bin/bash

# Script to diagnose connection reset issues

DOMAIN="azalee-patrimoine.fr"

echo "🔍 Diagnosing connection issues for $DOMAIN"
echo ""

# 1. Check if Nginx is listening on port 443
echo "1️⃣ Checking if Nginx is listening on port 443..."
if sudo ss -tlnp | grep -q ":443.*nginx"; then
    echo "✅ Nginx is listening on port 443"
    sudo ss -tlnp | grep ":443"
else
    echo "❌ Nginx is NOT listening on port 443"
    echo "Checking what's on port 443:"
    sudo ss -tlnp | grep ":443"
fi
echo ""

# 2. Check firewall status
echo "2️⃣ Checking firewall (UFW) status..."
if command -v ufw &> /dev/null; then
    sudo ufw status | head -10
else
    echo "UFW not installed, checking iptables..."
    sudo iptables -L -n | grep -E "443|80" || echo "No specific rules for ports 80/443"
fi
echo ""

# 3. Test HTTPS from server itself
echo "3️⃣ Testing HTTPS from server (localhost)..."
curl -v https://localhost 2>&1 | head -20
echo ""

# 4. Test HTTPS with domain name from server
echo "4️⃣ Testing HTTPS with domain name from server..."
curl -v https://$DOMAIN 2>&1 | head -30
echo ""

# 5. Check Nginx error logs for SSL issues
echo "5️⃣ Checking Nginx error logs for SSL issues..."
sudo tail -30 /var/log/nginx/error.log | grep -i -E "ssl|certificate|443|error" || echo "No SSL errors in recent logs"
echo ""

# 6. Check if certificate files are readable
echo "6️⃣ Checking SSL certificate files..."
if [ -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]; then
    echo "✅ Certificate file exists"
    sudo ls -la /etc/letsencrypt/live/$DOMAIN/
    echo ""
    echo "Testing certificate validity:"
    sudo openssl x509 -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem -noout -text 2>&1 | head -10
else
    echo "❌ Certificate file not found!"
fi
echo ""

# 7. Check Nginx configuration for SSL
echo "7️⃣ Checking Nginx SSL configuration..."
sudo grep -A 5 "listen 443" /etc/nginx/sites-available/$DOMAIN 2>/dev/null || echo "SSL configuration not found"
echo ""

# 8. Test if port 443 is accessible from outside
echo "8️⃣ Testing port 443 accessibility..."
echo "From server IP:"
curl -v --connect-timeout 5 https://$(curl -s ifconfig.me) 2>&1 | head -10 || echo "Cannot connect from external IP"
echo ""

# 9. Check if Docker is interfering
echo "9️⃣ Checking Docker port mappings..."
sudo docker-compose ps
echo ""

# 10. Check system resources
echo "🔟 Checking system resources..."
echo "Memory:"
free -h | head -2
echo ""
echo "Disk space:"
df -h / | tail -1
echo ""

echo "✅ Diagnosis complete!"
echo ""
echo "💡 Common fixes:"
echo "   - If port 443 is not listening: sudo systemctl restart nginx"
echo "   - If firewall is blocking: sudo ufw allow 443/tcp"
echo "   - If certificate issue: Check /etc/letsencrypt/live/$DOMAIN/"
echo "   - If Nginx config error: sudo nginx -t"

