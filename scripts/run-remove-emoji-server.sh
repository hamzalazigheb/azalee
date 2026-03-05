#!/bin/bash
# Script to run remove-pointing-hand-emoji.js on the server
# Usage: ./scripts/run-remove-emoji-server.sh

echo "🚀 Running emoji removal script on server..."
echo "============================================"
echo ""

# Navigate to project directory
cd ~/demo || cd /path/to/your/project

# Check if script exists
if [ ! -f "scripts/remove-pointing-hand-emoji.js" ]; then
    echo "❌ Script not found: scripts/remove-pointing-hand-emoji.js"
    echo "   Make sure you've pulled the latest changes: git pull origin prod"
    exit 1
fi

# Check if MongoDB container is running
if ! sudo docker ps | grep -q azalee-mongo; then
    echo "❌ MongoDB container (azalee-mongo) is not running"
    echo "   Start it with: sudo docker-compose up -d mongo"
    exit 1
fi

echo "✅ MongoDB container is running"
echo ""

# Method 1: Run in backend container (if it has Node.js and dependencies)
echo "📦 Method 1: Running in backend container..."
if sudo docker ps | grep -q azalee-backend; then
    echo "   Creating scripts directory in container..."
    sudo docker exec azalee-backend mkdir -p /app/scripts 2>/dev/null || true
    
    echo "   Copying script to container..."
    sudo docker cp scripts/remove-pointing-hand-emoji.js azalee-backend:/app/scripts/remove-pointing-hand-emoji.js
    
    echo "   Installing dependencies if needed..."
    sudo docker exec azalee-backend npm install dotenv mongoose --save 2>/dev/null || true
    
    echo "   Running script..."
    sudo docker exec -e MONGODB_URI="mongodb://mongo:27017/azalee_db" azalee-backend sh -c "cd /app && node scripts/remove-pointing-hand-emoji.js"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Script executed successfully!"
        exit 0
    fi
fi

# Method 2: Run in frontend container
echo ""
echo "📦 Method 2: Running in frontend container..."
if sudo docker ps | grep -q azalee-frontend; then
    echo "   Creating scripts directory in container..."
    sudo docker exec azalee-frontend mkdir -p /app/scripts 2>/dev/null || true
    
    echo "   Copying script to container..."
    sudo docker cp scripts/remove-pointing-hand-emoji.js azalee-frontend:/app/scripts/remove-pointing-hand-emoji.js
    
    echo "   Installing dependencies if needed..."
    sudo docker exec azalee-frontend npm install dotenv mongoose --save 2>/dev/null || true
    
    echo "   Running script..."
    sudo docker exec -e MONGODB_URI="mongodb://mongo:27017/azalee_db" azalee-frontend sh -c "cd /app && node scripts/remove-pointing-hand-emoji.js"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Script executed successfully!"
        exit 0
    fi
fi

# Method 3: Run directly on server (if Node.js is installed)
echo ""
echo "📦 Method 3: Running directly on server..."
if command -v node &> /dev/null; then
    echo "   Node.js found on server"
    echo "   Installing dependencies..."
    npm install dotenv mongoose --save 2>/dev/null || true
    
    echo "   Running script..."
    MONGODB_URI="mongodb://localhost:27017/azalee_db" node scripts/remove-pointing-hand-emoji.js
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Script executed successfully!"
        exit 0
    fi
fi

echo ""
echo "❌ Could not execute script. Please check:"
echo "   1. Docker containers are running: sudo docker-compose ps"
echo "   2. Script exists: ls scripts/remove-pointing-hand-emoji.js"
echo "   3. Node.js is available in containers or on server"
exit 1

