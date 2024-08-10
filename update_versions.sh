#!/bin/bash

# Function to update version and commit
update_version() {
  cd "$1" || exit
    echo "Updating version in $1"
    npm version patch
    new_version=$(grep '"version":' package.json | cut -d '"' -f 4)
    kubernetes_yaml_path="../infra/k8s/be-nest-depl.yaml"
    sed -i '' "s/\(mrodl\/stocks-be-nest:\).*/\1$new_version/" "$kubernetes_yaml_path"
    git add package.json package-lock.json "$kubernetes_yaml_path"
    cd - || exit
}

FRONTEND_PATH="./frontend"
BACKEND_PATH="./be"
BACKEND_PATH_NEST="./be-nest"

# Update versions
# update_version "$BACKEND_PATH"
update_version "$BACKEND_PATH_NEST"
update_version "$FRONTEND_PATH"

