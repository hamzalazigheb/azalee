#!/bin/bash

# Script to fix Nginx configuration for staging environment
# This script replaces the corrupted Nginx config with a clean one

set -e

NGINX_CONFIG="/etc/nginx/sites-available/azalee-patrimoine.fr"
BACKUP_FILE="/etc/nginx/sites-available/azalee-patrimoine.fr.backup.$(date +%Y%m%d_%H%M%S)"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CLEAN_CONFIG="$PROJECT_ROOT/nginx/azalee-patrimoine-complete.conf"

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
    echo "⚠️  Config file not found: $NGINX_CONFIG"
    exit 1
fi

# Check if clean config exists
if [ ! -f "$CLEAN_CONFIG" ]; then
    echo "❌ Clean config file not found: $CLEAN_CONFIG"
    echo "   Make sure you're running this from the project root"
    exit 1
fi

# Copy clean config
echo "📝 Copying clean configuration..."
cp "$CLEAN_CONFIG" "$NGINX_CONFIG"
echo "✅ Configuration copied"

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

