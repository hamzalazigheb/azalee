#!/bin/bash

# Script to fix SSL certificate generation when port 80 is in use

DOMAIN="azalee-patrimoine.fr"
EMAIL="contact@azalee-patrimoine.fr"  # Change this to your email

echo "🔧 Fixing SSL certificate for: $DOMAIN"

# Stop Nginx and Docker to free port 80
echo "⏸️  Stopping services to free port 80..."
sudo systemctl stop nginx
cd ~/demo 2>/dev/null || cd /home/ubuntu/demo 2>/dev/null || pwd
sudo docker-compose down

# Wait a moment for ports to be released
sleep 2

# Check if port 80 is free
if sudo lsof -i :80 > /dev/null 2>&1; then
    echo "⚠️  Port 80 is still in use. Checking what's using it..."
    sudo lsof -i :80
    echo "Please stop the service using port 80 and run this script again."
    exit 1
fi

# Generate SSL certificate
echo "🔐 Generating SSL certificate..."
sudo certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --non-interactive

if [ $? -eq 0 ]; then
    echo "✅ SSL certificate generated successfully!"
    
    # Copy Nginx configuration if not already done
    if [ ! -f /etc/nginx/sites-available/azalee-patrimoine.fr ]; then
        echo "📝 Setting up Nginx configuration..."
        sudo cp nginx/azalee-patrimoine.conf /etc/nginx/sites-available/azalee-patrimoine.fr
        sudo ln -sf /etc/nginx/sites-available/azalee-patrimoine.fr /etc/nginx/sites-enabled/
        
        # Remove default site
        if [ -f /etc/nginx/sites-enabled/default ]; then
            sudo rm /etc/nginx/sites-enabled/default
        fi
    fi
    
    # Test Nginx configuration
    echo "🧪 Testing Nginx configuration..."
    sudo nginx -t
    
    if [ $? -eq 0 ]; then
        # Restart Docker containers
        echo "🔄 Restarting Docker containers..."
        sudo docker-compose up -d
        
        # Start Nginx
        echo "▶️  Starting Nginx..."
        sudo systemctl start nginx
        sudo systemctl enable nginx
        
        echo "✅ Setup complete! Your site should now be accessible at https://$DOMAIN"
    else
        echo "❌ Nginx configuration test failed. Please check the configuration."
        exit 1
    fi
else
    echo "❌ Failed to generate SSL certificate. Please check:"
    echo "   1. DNS records are correctly configured"
    echo "   2. Port 80 is accessible from the internet"
    echo "   3. Domain points to this server's IP"
    exit 1
fi

