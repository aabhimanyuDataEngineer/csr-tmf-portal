# AI-Powered Clinical Documentation Portal

A comprehensive web application for managing Clinical Study Reports (CSR) and Trial Master File (TMF) documents with AI-powered search and summarization capabilities.

## Overview

This portal provides intelligent document navigation, search, and summarization for clinical research professionals while maintaining strict regulatory compliance, provenance tracking, and auditability. The system follows ICH E3 guidelines for CSR sections and TMF Reference Model for TMF artifacts.

## Architecture

- **Frontend**: React 18 with TypeScript, Material-UI, and React Query
- **Backend**: FastAPI with configurable AI/ML and search providers
- **Infrastructure**: Containerized deployment on AWS EKS
- **Data Storage**: AWS S3 for documents, Delta tables for metadata
- **Search**: Configurable (AWS OpenSearch or Databricks Vector Search)
- **AI/ML**: Configurable (AWS Bedrock or Databricks-hosted models)

## Key Features

- **Document Management**: CSR and TMF document access with full audit trails
- **Intelligent Search**: Keyword, semantic, and hybrid search capabilities
- **AI Summarization**: Grounded summaries with citation provenance
- **Regulatory Compliance**: 21 CFR Part 11 compliance and comprehensive audit logging
- **Configurable Providers**: Runtime switching between AI/ML and search providers
- **Enterprise Security**: Role-based access control and multi-factor authentication

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)
- AWS credentials configured (for cloud services)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd csr-tmf-portal
   ```

2. **Set up environment variables**
   ```bash
   cp Container/backend/.env.example Container/backend/.env
   # Edit .env file with your configuration
   ```

3. **Start services with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Configuration

The system supports configurable providers for different deployment scenarios:

#### AI/ML Providers
- **AWS Bedrock**: Claude and Titan models for summarization and embeddings
- **Databricks**: Custom hosted models and MLflow integration

#### Search Providers
- **AWS OpenSearch**: Managed Elasticsearch service with vector search
- **Databricks Vector Search**: Native vector similarity search

Configure providers via environment variables:
```bash
AI_PROVIDER=bedrock|databricks
SEARCH_PROVIDER=opensearch|databricks_vector
VECTOR_PROVIDER=opensearch|databricks_vector
```

## Project Structure

```
├── Container/
│   ├── backend/           # FastAPI backend application
│   │   ├── app/
│   │   │   ├── core/      # Configuration and provider abstractions
│   │   │   ├── services/  # Business logic services
│   │   │   ├── api/       # API endpoints
│   │   │   └── models/    # Data models
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   └── frontend/          # React frontend application
│       ├── src/
│       │   ├── components/
│       │   ├── services/
│       │   ├── types/
│       │   └── utils/
│       ├── Dockerfile
│       └── package.json
├── .kiro/
│   └── specs/            # Feature specifications and requirements
├── docker-compose.yml    # Local development setup
└── README.md
```

## Development Workflow

This project follows a spec-driven development approach:

1. **Requirements**: Detailed user stories and acceptance criteria
2. **Design**: Comprehensive architecture and component specifications  
3. **Implementation**: Task-based development with full traceability
4. **Testing**: Unit, integration, and regulatory compliance testing

See `.kiro/specs/ai-clinical-documentation-portal/` for complete specifications.

## Compliance and Security

- **21 CFR Part 11**: Electronic records and signatures compliance
- **ICH E6 (GCP)**: Good Clinical Practice guidelines adherence
- **GDPR/CCPA**: Privacy regulation compliance
- **Audit Trails**: Comprehensive logging of all user actions and AI operations
- **Data Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Access Control**: Role-based permissions and multi-factor authentication

## Deployment

The application is designed for deployment on AWS EKS with:

- **Container Registry**: AWS ECR for image storage
- **Secrets Management**: AWS Secrets Manager integration
- **Monitoring**: CloudWatch logs and metrics
- **Scaling**: Horizontal pod autoscaling based on demand

See deployment documentation for detailed Kubernetes manifests and Helm charts.

## Contributing

1. Review the specification documents in `.kiro/specs/`
2. Follow the task-based implementation plan
3. Ensure all code includes comprehensive tests
4. Maintain audit trail compliance in all features
5. Update documentation for any configuration changes

## License

This project is proprietary software for clinical research applications.

## Support

For technical support and deployment assistance, please refer to the deployment guide and API documentation.