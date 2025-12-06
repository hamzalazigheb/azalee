#!/bin/bash
# Script to check Git repository configuration on EC2 server
# Run this script on your EC2 instance

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 Checking Git Repository Configuration on EC2${NC}"
echo ""

# Common directories to check
DIRECTORIES=(
    "$HOME/demo"
    "$HOME/azalee-app"
    "/opt/azalee-app"
    "$HOME/azalee"
)

# Find directories that exist
FOUND_DIRS=()
for dir in "${DIRECTORIES[@]}"; do
    if [ -d "$dir" ]; then
        FOUND_DIRS+=("$dir")
    fi
done

# If no common directories found, search for git repos
if [ ${#FOUND_DIRS[@]} -eq 0 ]; then
    echo -e "${YELLOW}⚠️  No common directories found. Searching for Git repositories...${NC}"
    FOUND_DIRS=($(find "$HOME" -maxdepth 2 -type d -name ".git" -exec dirname {} \; 2>/dev/null))
fi

if [ ${#FOUND_DIRS[@]} -eq 0 ]; then
    echo -e "${YELLOW}❌ No Git repositories found in common locations${NC}"
    echo -e "${YELLOW}Please specify the directory manually:${NC}"
    echo -e "${BLUE}   cd /path/to/your/app${NC}"
    echo -e "${BLUE}   git remote -v${NC}"
    exit 1
fi

# Check each found directory
for dir in "${FOUND_DIRS[@]}"; do
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}📂 Directory: ${dir}${NC}"
    echo ""
    
    if [ ! -d "$dir/.git" ]; then
        echo -e "${YELLOW}⚠️  Not a Git repository${NC}"
        echo ""
        continue
    fi
    
    cd "$dir" || continue
    
    # Check remote URL
    echo -e "${BLUE}📡 Remote Repository:${NC}"
    git remote -v 2>/dev/null || echo -e "${YELLOW}   No remotes configured${NC}"
    echo ""
    
    # Check current branch
    echo -e "${BLUE}🌿 Current Branch:${NC}"
    git branch --show-current 2>/dev/null || echo -e "${YELLOW}   Unable to determine branch${NC}"
    echo ""
    
    # Check last commit
    echo -e "${BLUE}📝 Last Commit:${NC}"
    git log -1 --oneline 2>/dev/null || echo -e "${YELLOW}   No commits found${NC}"
    echo ""
    
    # Check if there are uncommitted changes
    echo -e "${BLUE}📋 Git Status:${NC}"
    if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
        echo -e "${YELLOW}   ⚠️  You have uncommitted changes${NC}"
        git status --short 2>/dev/null | head -5
    else
        echo -e "${GREEN}   ✅ Working directory is clean${NC}"
    fi
    echo ""
    
    # Check if behind/ahead of remote
    echo -e "${BLUE}🔄 Sync Status:${NC}"
    git fetch origin 2>/dev/null
    CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)
    if [ -n "$CURRENT_BRANCH" ]; then
        LOCAL=$(git rev-parse "$CURRENT_BRANCH" 2>/dev/null)
        REMOTE=$(git rev-parse "origin/$CURRENT_BRANCH" 2>/dev/null)
        if [ "$LOCAL" = "$REMOTE" ]; then
            echo -e "${GREEN}   ✅ Up to date with origin/${CURRENT_BRANCH}${NC}"
        else
            BEHIND=$(git rev-list --count "origin/$CURRENT_BRANCH..$CURRENT_BRANCH" 2>/dev/null || echo "0")
            AHEAD=$(git rev-list --count "$CURRENT_BRANCH..origin/$CURRENT_BRANCH" 2>/dev/null || echo "0")
            if [ "$BEHIND" -gt 0 ]; then
                echo -e "${YELLOW}   ⬇️  Behind origin/${CURRENT_BRANCH} by ${BEHIND} commit(s)${NC}"
            fi
            if [ "$AHEAD" -gt 0 ]; then
                echo -e "${YELLOW}   ⬆️  Ahead of origin/${CURRENT_BRANCH} by ${AHEAD} commit(s)${NC}"
            fi
        fi
    fi
    echo ""
    
    # Check Docker containers if docker-compose.yml exists
    if [ -f "docker-compose.yml" ]; then
        echo -e "${BLUE}🐳 Docker Containers:${NC}"
        docker-compose ps 2>/dev/null || echo -e "${YELLOW}   Docker Compose not available or containers not running${NC}"
        echo ""
    fi
    
    echo ""
done

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}💡 To update from the correct repository:${NC}"
echo -e "${YELLOW}   1. Navigate to your app directory${NC}"
echo -e "${YELLOW}   2. Check remote: ${GREEN}git remote -v${NC}"
echo -e "${YELLOW}   3. If wrong, update: ${GREEN}git remote set-url origin <correct-url>${NC}"
echo -e "${YELLOW}   4. Pull latest: ${GREEN}git pull origin <branch>${NC}"

