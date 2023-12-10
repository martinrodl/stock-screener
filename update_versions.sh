#!/bin/bash

# Function to update version and commit
update_version() {
    cd "$1" || exit
    echo "Updating version in $1"
    npm version patch
    git add package.json package-lock.json
    git commit -m "Increment version in $1"
    cd - || exit
}

# Path to your frontend and backend directories
FRONTEND_PATH="./frontend"
BACKEND_PATH="./be"

# Update versions
update_version "$BACKEND_PATH"
update_version "$FRONTEND_PATH"

# Push changes
echo "Pushing changes to repository..."
git push
