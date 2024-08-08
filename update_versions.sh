#!/bin/bash

# Function to update version in package.json and the corresponding Kubernetes deployment YAML
update_version() {
  cd "$1" || exit
    echo "Updating version in $1"
    npm version patch
    new_version=$(grep '"version":' package.json | cut -d '"' -f 4)
    # Path to the Kubernetes YAML specific to this project component
    kubernetes_yaml_path="$2"
    echo "Updating image version in $kubernetes_yaml_path to $new_version"
    sed -i '' "s|\(mrodl/stocks-\(be\|be-nest\):\).*|\1$new_version|" "$kubernetes_yaml_path"
    git add package.json package-lock.json "$kubernetes_yaml_path"
    git commit -m "Updated version to $new_version"
    cd - || exit
}

# Paths to the component directories
FRONTEND_PATH="./frontend"
BACKEND_PATH="./be"
BACKEND_PATH_NEST="./be-nest"

# Paths to their respective Kubernetes deployment YAMLs
FRONTEND_DEPL_YAML="../infra/k8s/frontend-depl.yaml"
BACKEND_DEPL_YAML="../infra/k8s/be-depl.yaml"
BACKEND_NEST_DEPL_YAML="../infra/k8s/be-nest-depl.yaml"

# Update versions
update_version "$BACKEND_PATH" "$BACKEND_DEPL_YAML"
update_version "$BACKEND_PATH_NEST" "$BACKEND_NEST_DEPL_YAML"
update_version "$FRONTEND_PATH" "$FRONTEND_DEPL_YAML"
