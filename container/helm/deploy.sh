#!/bin/bash

# CSR TMF Portal Frontend Deployment Script
# Usage: ./deploy.sh [environment] [action]
# Example: ./deploy.sh dev install
# Example: ./deploy.sh dev upgrade

set -e

# Configuration
CLUSTER_NAME="plotly-demo"
REGION="ap-south-1"
NAMESPACE="csr-tmf-portal"
RELEASE_NAME="csr-tmf-portal-frontend"

# Default values
ENVIRONMENT=${1:-dev}
ACTION=${2:-install}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 CSR TMF Portal Frontend Deployment${NC}"
echo "Environment: $ENVIRONMENT"
echo "Action: $ACTION"
echo "Cluster: $CLUSTER_NAME"
echo "Region: $REGION"
echo "Namespace: $NAMESPACE"
echo ""

# Check if kubectl is configured for the correct cluster
echo -e "${YELLOW}📋 Checking kubectl configuration...${NC}"
CURRENT_CONTEXT=$(kubectl config current-context 2>/dev/null || echo "none")
if [[ "$CURRENT_CONTEXT" != *"$CLUSTER_NAME"* ]]; then
    echo -e "${YELLOW}⚠️  Updating kubectl context for cluster $CLUSTER_NAME...${NC}"
    aws eks update-kubeconfig --region $REGION --name $CLUSTER_NAME
fi

# Create namespace if it doesn't exist
echo -e "${YELLOW}📦 Ensuring namespace exists...${NC}"
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

# Verify ECR access
echo -e "${YELLOW}🔐 Authenticating with ECR...${NC}"
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin 025066239748.dkr.ecr.$REGION.amazonaws.com

# Check if values file exists
VALUES_FILE="values/values_${ENVIRONMENT}.yaml"
if [ ! -f "$VALUES_FILE" ]; then
    echo -e "${RED}❌ Values file $VALUES_FILE not found!${NC}"
    exit 1
fi

# Validate Helm chart
echo -e "${YELLOW}✅ Validating Helm chart...${NC}"
helm lint .

# Deploy based on action
case $ACTION in
    "install")
        echo -e "${GREEN}📦 Installing $RELEASE_NAME...${NC}"
        helm install $RELEASE_NAME . \
            --namespace $NAMESPACE \
            --values $VALUES_FILE \
            --wait \
            --timeout 10m
        ;;
    "upgrade")
        echo -e "${GREEN}🔄 Upgrading $RELEASE_NAME...${NC}"
        helm upgrade $RELEASE_NAME . \
            --namespace $NAMESPACE \
            --values $VALUES_FILE \
            --wait \
            --timeout 10m
        ;;
    "uninstall")
        echo -e "${YELLOW}🗑️  Uninstalling $RELEASE_NAME...${NC}"
        helm uninstall $RELEASE_NAME --namespace $NAMESPACE
        ;;
    "status")
        echo -e "${GREEN}📊 Getting status of $RELEASE_NAME...${NC}"
        helm status $RELEASE_NAME --namespace $NAMESPACE
        ;;
    *)
        echo -e "${RED}❌ Unknown action: $ACTION${NC}"
        echo "Available actions: install, upgrade, uninstall, status"
        exit 1
        ;;
esac

# Show deployment status
if [ "$ACTION" != "uninstall" ]; then
    echo ""
    echo -e "${GREEN}🎉 Deployment completed!${NC}"
    echo ""
    echo -e "${YELLOW}📊 Checking pod status...${NC}"
    kubectl get pods -n $NAMESPACE -l app.kubernetes.io/name=csr-tmf-portal-frontend
    
    echo ""
    echo -e "${YELLOW}🌐 Checking service status...${NC}"
    kubectl get svc -n $NAMESPACE -l app.kubernetes.io/name=csr-tmf-portal-frontend
    
    echo ""
    echo -e "${YELLOW}🔗 Checking ingress status...${NC}"
    kubectl get ingress -n $NAMESPACE
    
    echo ""
    echo -e "${GREEN}✅ Deployment information:${NC}"
    echo "Release: $RELEASE_NAME"
    echo "Namespace: $NAMESPACE"
    echo "Environment: $ENVIRONMENT"
    
    # Get ingress URL if available
    INGRESS_HOST=$(kubectl get ingress -n $NAMESPACE -o jsonpath='{.items[0].status.loadBalancer.ingress[0].hostname}' 2>/dev/null || echo "pending")
    if [ "$INGRESS_HOST" != "pending" ] && [ "$INGRESS_HOST" != "" ]; then
        echo -e "${GREEN}🌍 Application URL: https://$INGRESS_HOST${NC}"
    else
        echo -e "${YELLOW}⏳ Ingress URL is still being provisioned...${NC}"
    fi
fi