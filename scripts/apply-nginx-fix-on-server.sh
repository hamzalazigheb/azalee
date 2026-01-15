#!/bin/bash

# Script to apply Nginx fix directly on the server
# Run this script on the EC2 server

set -e

NGINX_CONFIG="/etc/nginx/sites-available/azalee-patrimoine.fr"
BACKUP_FILE="/etc/nginx/sites-available/azalee-patrimoine.fr.backup.$(date +%Y%m%d_%H%M%S)"

echo "🔧 Fixing Nginx configuration for staging..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Please run as root (use sudo)"
    exit 1
fi

# Backup current config
if [ -f "$NGINX_CONFIG" ]; then
    echo "📦 Creating backup: $BACKUP_FILE"
    cp "$NGINX_CONFIG" "$BACKUP_FILE"
    echo "✅ Backup created"
else
    echo "❌ Config file not found: $NGINX_CONFIG"
    exit 1
fi

# Create clean config
cat > "$NGINX_CONFIG" << 'NGINX_EOF'
server {
    listen 80;
    server_name azalee-patrimoine.fr www.azalee-patrimoine.fr;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name azalee-patrimoine.fr www.azalee-patrimoine.fr;

    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/azalee-patrimoine.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/azalee-patrimoine.fr/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
    gzip_disable "MSIE [1-6]\\.";

    # Client Max Body Size
    client_max_body_size 20M;

    # ==================== STAGING CONFIGURATION ====================
    # Staging - Next.js static assets (_next/static) - DOIT être le plus spécifique
    location /staging/_next/static {
        proxy_pass http://localhost:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Staging - Next.js webpack chunks and other _next files
    location /staging/_next {
        proxy_pass http://localhost:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Staging - Images and static files
    location /staging/images {
        proxy_pass http://localhost:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Staging Frontend - DOIT être après les locations plus spécifiques
    location /staging {
        proxy_pass http://localhost:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Staging Backend API
    location /staging-api {
        proxy_pass http://localhost:3002/api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Staging WebSocket support
    location /staging/_next/webpack-hmr {
        proxy_pass http://localhost:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
    # ==================== FIN STAGING ====================

    # Proxy to Docker container (PRODUCTION)
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # WebSocket support (PRODUCTION)
    location /_next/webpack-hmr {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }

    # Static files caching (PRODUCTION)
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3001;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_EOF

echo "✅ Clean configuration written"

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
if nginx -t; then
    echo "✅ Nginx configuration is valid"
    
    # Reload Nginx
    echo "🔄 Reloading Nginx..."
    if systemctl reload nginx; then
        echo "✅ Nginx reloaded successfully"
        echo ""
        echo "🎉 Nginx configuration fixed and reloaded!"
        echo "   Backup saved at: $BACKUP_FILE"
    else
        echo "❌ Failed to reload Nginx"
        echo "   Restoring backup..."
        cp "$BACKUP_FILE" "$NGINX_CONFIG"
        exit 1
    fi
else
    echo "❌ Nginx configuration test failed"
    echo "   Restoring backup..."
    cp "$BACKUP_FILE" "$NGINX_CONFIG"
    exit 1
fi

