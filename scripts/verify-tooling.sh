#!/bin/bash
set -e

echo "Verifying project tooling..."

# GitHub CLI
if command -v gh &> /dev/null; then
  if gh auth status &> /dev/null; then
    echo "✓ GitHub CLI authenticated"
  else
    echo "✗ GitHub CLI not authenticated. Run: gh auth login"
    exit 1
  fi
else
  echo "⚠ GitHub CLI not installed. Run: brew install gh"
fi

# Railway CLI
if command -v railway &> /dev/null; then
  if railway whoami &> /dev/null; then
    echo "✓ Railway CLI authenticated"
  else
    echo "✗ Railway CLI not authenticated. Run: railway login"
  fi
else
  echo "ℹ Railway CLI not installed (optional). Install: npm i -g @railway/cli"
fi

# pnpm
if command -v pnpm &> /dev/null; then
  echo "✓ pnpm installed ($(pnpm --version))"
else
  echo "✗ pnpm not installed. Run: npm i -g pnpm"
  exit 1
fi

# Node.js version
if command -v node &> /dev/null; then
  NODE_VERSION=$(node --version)
  echo "✓ Node.js installed ($NODE_VERSION)"

  # Check if Node >= 18
  NODE_MAJOR=$(echo $NODE_VERSION | cut -d. -f1 | sed 's/v//')
  if [ "$NODE_MAJOR" -lt 18 ]; then
    echo "⚠ Warning: Node.js 18+ is recommended (current: $NODE_VERSION)"
  fi
else
  echo "✗ Node.js not installed"
  exit 1
fi

# Docker (optional but recommended for local PostgreSQL)
if command -v docker &> /dev/null; then
  if docker info &> /dev/null; then
    echo "✓ Docker running"
  else
    echo "⚠ Docker installed but not running"
  fi
else
  echo "ℹ Docker not installed (optional for local PostgreSQL)"
fi

echo ""
echo "Tooling verification complete!"
