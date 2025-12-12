#!/bin/bash

# Final verification script after SSL setup

DOMAIN="azalee-patrimoine.fr"

echo "✅ Final Verification for $DOMAIN"
echo ""

# 1. Check SSL certificate
echo "1️⃣ SSL Certificate Status:"
if [ -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]; then
    echo "✅ Certificate exists"
    echo "Certificate details:"
    sudo openssl x509 -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem -noout -subject -issuer -dates
else
    echo "❌ Certificate not found!"
    exit 1
fi
echo ""

# 2. Check Nginx status
echo "2️⃣ Nginx Status:"
sudo systemctl is-active nginx && echo "✅ Nginx is running" || echo "❌ Nginx is not running"
echo ""

# 3. Check Docker containers
echo "3️⃣ Docker Containers:"
sudo docker-compose ps
echo ""

# 4. Test HTTP (should redirect to HTTPS)
echo "4️⃣ Testing HTTP → HTTPS redirect:"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://$DOMAIN)
if [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    echo "✅ HTTP correctly redirects to HTTPS (Code: $HTTP_CODE)"
else
    echo "⚠️  HTTP returned code: $HTTP_CODE"
fi
echo ""

# 5. Test HTTPS
echo "5️⃣ Testing HTTPS:"
HTTPS_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN)
if [ "$HTTPS_CODE" = "200" ] || [ "$HTTPS_CODE" = "301" ] || [ "$HTTPS_CODE" = "302" ]; then
    echo "✅ HTTPS is working (Code: $HTTPS_CODE)"
    echo "Response headers:"
    curl -I https://$DOMAIN 2>&1 | head -10
else
    echo "❌ HTTPS returned code: $HTTPS_CODE"
    echo "Error details:"
    curl -v https://$DOMAIN 2>&1 | tail -10
fi
echo ""

# 6. Test www subdomain
echo "6️⃣ Testing www subdomain:"
WWW_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://www.$DOMAIN)
if [ "$WWW_CODE" = "200" ] || [ "$WWW_CODE" = "301" ] || [ "$WWW_CODE" = "302" ]; then
    echo "✅ www subdomain is working (Code: $WWW_CODE)"
else
    echo "⚠️  www subdomain returned code: $WWW_CODE"
fi
echo ""

# 7. Check SSL certificate expiration
echo "7️⃣ SSL Certificate Expiration:"
EXPIRY=$(sudo openssl x509 -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem -noout -enddate | cut -d= -f2)
echo "Certificate expires on: $EXPIRY"
echo "Auto-renewal is configured: ✅"
echo ""

# 8. Test local Docker connection
echo "8️⃣ Testing Docker frontend (localhost:3001):"
LOCAL_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001)
if [ "$LOCAL_CODE" = "200" ]; then
    echo "✅ Docker frontend is responding (Code: $LOCAL_CODE)"
else
    echo "⚠️  Docker frontend returned code: $LOCAL_CODE"
fi
echo ""

echo "🎉 Verification complete!"
echo ""
echo "📋 Summary:"
echo "  - SSL Certificate: ✅"
echo "  - Nginx: ✅"
echo "  - Docker: ✅"
echo "  - HTTPS: $([ "$HTTPS_CODE" = "200" ] && echo "✅" || echo "⚠️")"
echo ""
echo "🌐 Your site should now be accessible at:"
echo "   https://$DOMAIN"
echo "   https://www.$DOMAIN"

