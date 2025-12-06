#!/bin/bash
# Complete deployment script - Push to GitHub and deploy to EC2
# This script pushes all changes to GitHub and provides instructions for EC2 deployment

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Deployment Script - Azalee Patrimoine${NC}"
echo ""

# Configuration
REPO_URL="https://github.com/hamzaakrsmartconsulting-droid/azaleee.git"
BRANCH="prod"
EC2_USER="ubuntu"
EC2_DIR="~/demo"  # Based on the docker ps output showing the containers

# Step 1: Check git status
echo -e "${YELLOW}📋 Step 1: Checking git status...${NC}"
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  You have uncommitted changes.${NC}"
    echo -e "${YELLOW}Do you want to commit and push them? (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo -e "${YELLOW}Enter commit message (or press Enter for default):${NC}"
        read -r commit_msg
        if [ -z "$commit_msg" ]; then
            commit_msg="Update: Add contact form CMS integration and notification system"
        fi
        git add .
        git commit -m "$commit_msg"
        echo -e "${GREEN}✅ Changes committed${NC}"
    else
        echo -e "${YELLOW}⚠️  Skipping commit. Make sure to commit your changes before deploying.${NC}"
    fi
else
    echo -e "${GREEN}✅ Working directory is clean${NC}"
fi

# Step 2: Push to GitHub
echo ""
echo -e "${YELLOW}📤 Step 2: Pushing to GitHub...${NC}"
current_branch=$(git branch --show-current)
echo -e "${BLUE}Current branch: ${current_branch}${NC}"

if [ "$current_branch" != "$BRANCH" ]; then
    echo -e "${YELLOW}⚠️  You are on branch '${current_branch}', not '${BRANCH}'${NC}"
    echo -e "${YELLOW}Do you want to push to '${current_branch}' and then merge to '${BRANCH}'? (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        git push origin "$current_branch"
        echo -e "${GREEN}✅ Pushed to ${current_branch}${NC}"
        echo -e "${YELLOW}⚠️  Please merge ${current_branch} to ${BRANCH} on GitHub or run:${NC}"
        echo -e "${BLUE}   git checkout ${BRANCH}${NC}"
        echo -e "${BLUE}   git merge ${current_branch}${NC}"
        echo -e "${BLUE}   git push origin ${BRANCH}${NC}"
    fi
else
    git push origin "$BRANCH"
    echo -e "${GREEN}✅ Pushed to ${BRANCH}${NC}"
fi

# Step 3: EC2 Deployment Instructions
echo ""
echo -e "${GREEN}📋 Step 3: EC2 Deployment Instructions${NC}"
echo ""
echo -e "${BLUE}To deploy on EC2, run these commands on your EC2 server:${NC}"
echo ""
echo -e "${YELLOW}# Option 1: Quick update (recommended)${NC}"
echo -e "${GREEN}cd ~/demo${NC}"
echo -e "${GREEN}git fetch origin${NC}"
echo -e "${GREEN}git checkout ${BRANCH}${NC}"
echo -e "${GREEN}git pull origin ${BRANCH}${NC}"
echo -e "${GREEN}docker-compose up -d --build frontend backend${NC}"
echo ""
echo -e "${YELLOW}# Option 2: Use the update script${NC}"
echo -e "${GREEN}cd ~/demo${NC}"
echo -e "${GREEN}chmod +x update-ec2-frontend.sh${NC}"
echo -e "${GREEN}./update-ec2-frontend.sh${NC}"
echo ""
echo -e "${YELLOW}# Verify deployment${NC}"
echo -e "${GREEN}docker-compose ps${NC}"
echo -e "${GREEN}docker-compose logs -f frontend${NC}"
echo ""

# Step 4: Generate EC2 deployment script
echo -e "${YELLOW}📝 Step 4: Generating EC2 deployment script...${NC}"
cat > deploy-on-ec2.sh << 'EC2SCRIPT'
#!/bin/bash
# Run this script on your EC2 instance to deploy all changes

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🚀 Deploying Azalee Patrimoine updates to EC2...${NC}"

# Configuration
APP_DIR="${APP_DIR:-$HOME/demo}"
BRANCH="${BRANCH:-prod}"

# Navigate to app directory
if [ ! -d "$APP_DIR" ]; then
    echo -e "${RED}❌ Directory $APP_DIR not found${NC}"
    echo -e "${YELLOW}Please set APP_DIR environment variable or update the script${NC}"
    exit 1
fi

cd "$APP_DIR"
echo -e "${GREEN}📂 Working directory: $APP_DIR${NC}"

# Pull latest changes
echo -e "${YELLOW}📥 Pulling latest changes from GitHub...${NC}"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

# Install/update npm dependencies if package.json changed
if git diff HEAD@{1} HEAD --name-only | grep -q "package.json"; then
    echo -e "${YELLOW}📦 package.json changed, dependencies may need updating...${NC}"
    echo -e "${YELLOW}⚠️  Note: Dependencies are installed during Docker build${NC}"
fi

# Rebuild and restart containers
echo -e "${YELLOW}🔨 Rebuilding and restarting containers...${NC}"
docker-compose up -d --build frontend backend

# Wait for containers to start
echo -e "${YELLOW}⏳ Waiting for containers to start...${NC}"
sleep 10

# Check status
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${GREEN}📊 Container status:${NC}"
docker-compose ps

echo ""
echo -e "${YELLOW}📝 Useful commands:${NC}"
echo -e "   View frontend logs: ${GREEN}docker-compose logs -f frontend${NC}"
echo -e "   View backend logs:  ${GREEN}docker-compose logs -f backend${NC}"
echo -e "   View all logs:      ${GREEN}docker-compose logs -f${NC}"
echo -e "   Restart containers: ${GREEN}docker-compose restart${NC}"
EC2SCRIPT

chmod +x deploy-on-ec2.sh
echo -e "${GREEN}✅ Created deploy-on-ec2.sh${NC}"
echo ""
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "   1. Copy ${GREEN}deploy-on-ec2.sh${NC} to your EC2 server"
echo -e "   2. Run it on EC2: ${GREEN}./deploy-on-ec2.sh${NC}"
echo ""
echo -e "${YELLOW}Or connect to EC2 and run the commands manually (see Option 1 above)${NC}"
echo ""

