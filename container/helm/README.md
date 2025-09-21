# CSR TMF Portal Frontend Helm Chart

This Helm chart deploys the AI-Powered Clinical Documentation Portal Frontend to Kubernetes.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.2.0+
- AWS CLI configured with appropriate permissions
- kubectl configured for your EKS cluster

## Installation

### Quick Start

1. **Update kubectl context for your EKS cluster:**
   ```bash
   aws eks update-kubeconfig --region ap-south-1 --name plotly-demo
   ```

2. **Deploy using the deployment script:**
   ```bash
   cd Container/helm
   ./deploy.sh dev install
   ```

### Manual Installation

1. **Create namespace:**
   ```bash
   kubectl create namespace csr-tmf-portal
   ```

2. **Install the chart:**
   ```bash
   helm install csr-tmf-portal-frontend . \
     --namespace csr-tmf-portal \
     --values values/values_dev.yaml
   ```

## Configuration

### Environment-specific Values

- `values/values_dev.yaml` - Development environment configuration

### Key Configuration Options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `image.repository` | Container image repository | `025066239748.dkr.ecr.ap-south-1.amazonaws.com/csr-tmf-portal/frontend` |
| `image.tag` | Container image tag | `latest` |
| `replicaCount` | Number of replicas | `2` |
| `service.type` | Kubernetes service type | `ClusterIP` |
| `ingress.enabled` | Enable ingress | `true` |
| `ingress.className` | Ingress class name | `alb` |
| `resources.requests.cpu` | CPU request | `250m` |
| `resources.requests.memory` | Memory request | `256Mi` |
| `autoscaling.enabled` | Enable HPA | `true` |
| `autoscaling.minReplicas` | Minimum replicas | `2` |
| `autoscaling.maxReplicas` | Maximum replicas | `10` |

## Deployment Commands

### Install
```bash
./deploy.sh dev install
```

### Upgrade
```bash
./deploy.sh dev upgrade
```

### Check Status
```bash
./deploy.sh dev status
```

### Uninstall
```bash
./deploy.sh dev uninstall
```

## Monitoring

The application includes:
- Health check endpoints at `/health`
- Prometheus metrics annotations
- Liveness and readiness probes

## Security

- Runs as non-root user
- Security contexts configured
- Service account with IAM role binding
- Network policies (if enabled)

## Troubleshooting

### Check pod logs
```bash
kubectl logs -n csr-tmf-portal -l app.kubernetes.io/name=csr-tmf-portal-frontend
```

### Check pod status
```bash
kubectl get pods -n csr-tmf-portal -l app.kubernetes.io/name=csr-tmf-portal-frontend
```

### Check ingress
```bash
kubectl get ingress -n csr-tmf-portal
kubectl describe ingress -n csr-tmf-portal
```

### Check service
```bash
kubectl get svc -n csr-tmf-portal
```

## Customization

To customize the deployment:

1. Copy `values/values_dev.yaml` to create environment-specific values
2. Modify the configuration as needed
3. Deploy with your custom values file:
   ```bash
   helm upgrade csr-tmf-portal-frontend . \
     --namespace csr-tmf-portal \
     --values values/your-custom-values.yaml
   ```

## Support

For issues and questions, please check:
- Pod logs for application errors
- Ingress controller logs for routing issues
- AWS Load Balancer Controller logs for ALB issues