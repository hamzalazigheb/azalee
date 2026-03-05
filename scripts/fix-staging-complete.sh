#!/bin/bash
# Complete script to fix all staging issues: Nginx config, rebuild container

set -e

echo "🔧 Fixing staging environment completely..."

cd ~/azalee-staging || { echo "❌ Cannot find ~/azalee-staging directory"; exit 1; }

# 1. Backup Nginx
echo "   → Backing up Nginx config..."
sudo cp /etc/nginx/sites-available/azalee-patrimoine.fr /etc/nginx/sites-available/azalee-patrimoine.fr.backup.$(date +%Y%m%d_%H%M%S)

# 2. Fix Nginx - Remove duplicate /staging/api blocks
echo "   → Removing duplicate /staging/api blocks..."
sudo sed -i '/location \/staging\/api {/,/^[[:space:]]*}/d' /etc/nginx/sites-available/azalee-patrimoine.fr

# 3. Fix Nginx - Add ^~ priority to /staging/_next blocks
echo "   → Adding ^~ priority to /staging/_next blocks..."
sudo sed -i 's|location /staging/_next/static|location ^~ /staging/_next/static|' /etc/nginx/sites-available/azalee-patrimoine.fr
sudo sed -i 's|location /staging/_next {|location ^~ /staging/_next {|' /etc/nginx/sites-available/azalee-patrimoine.fr

# 4. Add /staging/api block AFTER /staging-api (not inside)
echo "   → Adding /staging/api location block..."
# Find the closing brace of /staging-api and add /staging/api after it
sudo awk '
/location \/staging-api {/ {
    in_staging_api = 1
    print
    next
}
in_staging_api && /^[[:space:]]*}/ {
    print
    in_staging_api = 0
    # Add /staging/api block after /staging-api closes
    print ""
    print "    location /staging/api {"
    print "        proxy_pass http://localhost:3002/api;"
    print "        proxy_http_version 1.1;"
    print "        proxy_set_header Upgrade $http_upgrade;"
    print "        proxy_set_header Connection '\''upgrade'\'';"
    print "        proxy_set_header Host $host;"
    print "        proxy_set_header X-Real-IP $remote_addr;"
    print "        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;"
    print "        proxy_set_header X-Forwarded-Proto $scheme;"
    print "        proxy_connect_timeout 60s;"
    print "        proxy_send_timeout 60s;"
    print "        proxy_read_timeout 60s;"
    print "    }"
    next
}
{ print }
' /etc/nginx/sites-available/azalee-patrimoine.fr > /tmp/nginx-fixed.conf
sudo mv /tmp/nginx-fixed.conf /etc/nginx/sites-available/azalee-patrimoine.fr

# 5. Test and reload Nginx
echo "   → Testing Nginx configuration..."
if sudo nginx -t; then
    echo "   ✅ Nginx configuration is valid"
    sudo systemctl reload nginx
    echo "   ✅ Nginx reloaded"
else
    echo "   ❌ Nginx configuration test failed!"
    exit 1
fi

# 6. Pull latest code
echo ""
echo "🔄 Pulling latest code..."
git pull origin prod

# 7. Verify assetPrefix is in next.config.mjs
echo "   → Verifying assetPrefix in next.config.mjs..."
if grep -q "assetPrefix" next.config.mjs; then
    echo "   ✅ assetPrefix found in next.config.mjs"
else
    echo "   ❌ assetPrefix NOT found! Please check next.config.mjs"
    exit 1
fi

# 8. Rebuild container
echo ""
echo "🏗️  Rebuilding container (this will take a few minutes)..."
docker-compose -f docker-compose.staging.yml down
docker-compose -f docker-compose.staging.yml build --no-cache frontend-staging
docker-compose -f docker-compose.staging.yml up -d

# 9. Wait for container to start
echo "   → Waiting for container to start..."
sleep 40

# 10. Tests
echo ""
echo "🧪 Testing..."
echo ""
echo "1. Testing CSS:"
CSS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://azalee-patrimoine.fr/staging/_next/static/css/3cb65de941d27fa5.css)
if [ "$CSS_STATUS" = "200" ]; then
    echo "   ✅ CSS: OK (200)"
else
    echo "   ❌ CSS: Failed ($CSS_STATUS)"
fi

echo ""
echo "2. Testing API:"
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://azalee-patrimoine.fr/staging/api/cms/content?path=sara")
if [ "$API_STATUS" = "200" ]; then
    echo "   ✅ API: OK (200)"
else
    echo "   ❌ API: Failed ($API_STATUS)"
fi

echo ""
echo "3. Testing image path in HTML:"
IMAGE_PATHS=$(curl -s https://azalee-patrimoine.fr/staging | grep -o 'src="[^"]*images[^"]*"' | head -3)
if echo "$IMAGE_PATHS" | grep -q "/staging/images"; then
    echo "   ✅ Images: Prefixed with /staging"
    echo "$IMAGE_PATHS"
else
    echo "   ❌ Images: NOT prefixed correctly"
    echo "$IMAGE_PATHS"
fi

echo ""
echo "🎉 Done! Check the results above."

