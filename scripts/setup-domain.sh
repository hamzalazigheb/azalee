#!/bin/bash

# Script to setup domain azalee-patrimoine.fr with Nginx and SSL

DOMAIN="azalee-patrimoine.fr"
EMAIL="contact@azalee-patrimoine.fr"  # Change this to your email

echo "🚀 Setting up domain: $DOMAIN"

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt install -y nginx

# Install Certbot for Let's Encrypt
echo "📦 Installing Certbot..."
sudo apt install -y certbot python3-certbot-nginx

# Stop Nginx temporarily for initial certificate generation
echo "⏸️  Stopping Nginx..."
sudo systemctl stop nginx

# Generate SSL certificate
echo "🔐 Generating SSL certificate..."
sudo certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --non-interactive

# Copy Nginx configuration
echo "📝 Setting up Nginx configuration..."
sudo cp nginx/azalee-patrimoine.conf /etc/nginx/sites-available/azalee-patrimoine.fr
sudo ln -sf /etc/nginx/sites-available/azalee-patrimoine.fr /etc/nginx/sites-enabled/

# Remove default Nginx site if exists
if [ -f /etc/nginx/sites-enabled/default ]; then
    sudo rm /etc/nginx/sites-enabled/default
fi

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
sudo nginx -t

# Start Nginx
echo "▶️  Starting Nginx..."
sudo systemctl start nginx
sudo systemctl enable nginx

# Setup auto-renewal for SSL certificate
echo "🔄 Setting up SSL certificate auto-renewal..."
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Update docker-compose environment variables
echo "🔧 Updating environment variables..."
if [ -f .env.production ]; then
    sed -i "s|NEXT_PUBLIC_APP_URL=.*|NEXT_PUBLIC_APP_URL=https://$DOMAIN|g" .env.production
    sed -i "s|NEXT_PUBLIC_API_URL=.*|NEXT_PUBLIC_API_URL=https://$DOMAIN/api|g" .env.production
else
    echo "NEXT_PUBLIC_APP_URL=https://$DOMAIN" >> .env.production
    echo "NEXT_PUBLIC_API_URL=https://$DOMAIN/api" >> .env.production
fi

echo "✅ Domain setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Configure DNS records in 2switch:"
echo "   - A record: @ -> YOUR_SERVER_IP"
echo "   - A record: www -> YOUR_SERVER_IP"
echo ""
echo "2. Restart Docker containers:"
echo "   sudo docker-compose down"
echo "   sudo docker-compose up -d"
echo ""
echo "3. Verify SSL certificate renewal:"
echo "   sudo certbot renew --dry-run"

