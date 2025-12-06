#!/bin/bash
# Script to fix Git repository URL on EC2 server
# Run this script on your EC2 instance

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔧 Fixing Git Repository Configuration on EC2${NC}"
echo ""

# Configuration
CORRECT_REPO="https://github.com/hamzaakrsmartconsulting-droid/azaleee.git"
CORRECT_BRANCH="prod"
APP_DIR="${APP_DIR:-$HOME/demo}"

# Check if directory exists
if [ ! -d "$APP_DIR" ]; then
    echo -e "${RED}❌ Directory $APP_DIR not found${NC}"
    echo -e "${YELLOW}Please specify the correct directory:${NC}"
    echo -e "${BLUE}   export APP_DIR=/path/to/your/app${NC}"
    echo -e "${BLUE}   ./fix-ec2-repo.sh${NC}"
    exit 1
fi

cd "$APP_DIR"
echo -e "${GREEN}📂 Working directory: $APP_DIR${NC}"
echo ""

# Check if it's a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ This is not a Git repository${NC}"
    exit 1
fi

# Show current remote
echo -e "${YELLOW}📡 Current remote configuration:${NC}"
git remote -v
echo ""

# Update remote URL
echo -e "${YELLOW}🔄 Updating remote URL to: ${CORRECT_REPO}${NC}"
git remote set-url origin "$CORRECT_REPO"

# Verify the change
echo -e "${GREEN}✅ Remote URL updated${NC}"
echo ""
echo -e "${YELLOW}📡 New remote configuration:${NC}"
git remote -v
echo ""

# Fetch from new remote
echo -e "${YELLOW}📥 Fetching from new remote...${NC}"
git fetch origin

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${BLUE}🌿 Current branch: ${CURRENT_BRANCH}${NC}"

# Switch to correct branch if needed
if [ "$CURRENT_BRANCH" != "$CORRECT_BRANCH" ]; then
    echo -e "${YELLOW}⚠️  You are on branch '${CURRENT_BRANCH}', switching to '${CORRECT_BRANCH}'...${NC}"
    if git show-ref --verify --quiet refs/heads/"$CORRECT_BRANCH"; then
        git checkout "$CORRECT_BRANCH"
    else
        echo -e "${YELLOW}   Branch '${CORRECT_BRANCH}' doesn't exist locally, creating it...${NC}"
        git checkout -b "$CORRECT_BRANCH" "origin/$CORRECT_BRANCH"
    fi
fi

# Pull latest changes
echo -e "${YELLOW}📥 Pulling latest changes from ${CORRECT_BRANCH}...${NC}"
git pull origin "$CORRECT_BRANCH"

echo ""
echo -e "${GREEN}✅ Repository configuration fixed!${NC}"
echo ""
echo -e "${BLUE}📋 Summary:${NC}"
echo -e "   Repository: ${GREEN}$CORRECT_REPO${NC}"
echo -e "   Branch: ${GREEN}$CORRECT_BRANCH${NC}"
echo -e "   Last commit: ${GREEN}$(git log -1 --oneline)${NC}"
echo ""
echo -e "${YELLOW}💡 Next step: Deploy the changes${NC}"
echo -e "${BLUE}   docker-compose up -d --build frontend backend${NC}"

