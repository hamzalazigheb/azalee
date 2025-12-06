#!/bin/bash
# Change admin password on EC2
# Run this on your EC2 instance

echo "🔄 Changing admin password on EC2..."

cd ~/demo

# Pull latest code (if needed)
# git pull

# Copy script to container
sudo docker cp change-admin-password.js azalee-backend:/tmp/change-admin-password.js

# Run the script inside the container
sudo docker exec -e MONGODB_URI="$MONGODB_URI" azalee-backend node /tmp/change-admin-password.js

echo ""
echo "✅ Password change complete!"
echo "📋 Use these credentials to login:"
echo "   Email: admin@azalee.com"
echo "   Password: akr123@"

