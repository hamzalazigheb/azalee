#!/bin/bash
# Script to fix Nginx configuration for staging and rebuild the container

set -e

echo "🔧 Fixing Nginx configuration for staging..."

# Backup current config
sudo cp /etc/nginx/sites-available/azalee-patrimoine.fr /etc/nginx/sites-available/azalee-patrimoine.fr.backup.$(date +%Y%m%d_%H%M%S)

# 1. Fix CSS routing with ^~ priority
echo "   → Adding ^~ priority to /staging/_next blocks..."
sudo sed -i 's|location /staging/_next/static|location ^~ /staging/_next/static|' /etc/nginx/sites-available/azalee-patrimoine.fr
sudo sed -i 's|location /staging/_next {|location ^~ /staging/_next {|' /etc/nginx/sites-available/azalee-patrimoine.fr

# 2. Add /staging/api block if it doesn't exist
if ! sudo grep -q "location /staging/api" /etc/nginx/sites-available/azalee-patrimoine.fr; then
    echo "   → Adding /staging/api location block..."
    sudo sed -i '/location \/staging-api {/,/^[[:space:]]*}/a\
\
    location /staging/api {\
        proxy_pass http://localhost:3002/api;\
        proxy_http_version 1.1;\
        proxy_set_header Upgrade $http_upgrade;\
        proxy_set_header Connection '\''upgrade'\'';\
        proxy_set_header Host $host;\
        proxy_set_header X-Real-IP $remote_addr;\
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\
        proxy_set_header X-Forwarded-Proto $scheme;\
        proxy_connect_timeout 60s;\
        proxy_send_timeout 60s;\
        proxy_read_timeout 60s;\
    }
' /etc/nginx/sites-available/azalee-patrimoine.fr
else
    echo "   → /staging/api block already exists"
fi

# 3. Test Nginx configuration
echo "   → Testing Nginx configuration..."
if sudo nginx -t; then
    echo "   ✅ Nginx configuration is valid"
    sudo systemctl reload nginx
    echo "   ✅ Nginx reloaded"
else
    echo "   ❌ Nginx configuration test failed!"
    exit 1
fi

echo ""
echo "🔄 Rebuilding staging container..."

cd ~/azalee-staging || { echo "❌ Cannot find ~/azalee-staging directory"; exit 1; }

# 4. Pull latest changes
echo "   → Pulling latest changes from Git..."
git pull origin prod

# 5. Rebuild container
echo "   → Stopping containers..."
docker-compose -f docker-compose.staging.yml down

echo "   → Rebuilding frontend container (this may take a few minutes)..."
docker-compose -f docker-compose.staging.yml build --no-cache frontend-staging

echo "   → Starting containers..."
docker-compose -f docker-compose.staging.yml up -d

echo "   → Waiting for container to start..."
sleep 30

echo ""
echo "✅ Done! Testing..."

# 6. Test endpoints
echo ""
echo "Testing CSS:"
curl -I https://azalee-patrimoine.fr/staging/_next/static/css/3cb65de941d27fa5.css 2>&1 | head -1

echo ""
echo "Testing API:"
curl -I "https://azalee-patrimoine.fr/staging/api/cms/content?path=sara" 2>&1 | head -1

echo ""
echo "Testing image path in HTML:"
curl -s https://azalee-patrimoine.fr/staging | grep -o 'src="[^"]*images[^"]*"' | head -3

echo ""
echo "🎉 All done! Check the results above."

