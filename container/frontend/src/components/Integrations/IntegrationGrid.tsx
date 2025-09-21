import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { getCurrentClientConfig } from '../../config/clientConfig';

const IntegrationGrid: React.FC = () => {
  const clientConfig = getCurrentClientConfig();

  const integrations = [
    {
      iconSrc: '/assets/connector/veeva.png',
      title: 'Veeva Vault',
      description: 'Direct integration with Veeva Vault for seamless document management and regulatory submissions',
      category: 'Document Management',
      features: ['Real-time sync', 'Automated workflows', 'Compliance tracking']
    },
    {
      iconSrc: '/assets/connector/aws.png',
      title: 'AWS Data Lake',
      description: 'Connect to AWS S3, Redshift, and other AWS services for comprehensive data integration',
      category: 'Cloud Data Platform',
      features: ['S3 integration', 'Redshift analytics', 'Lambda processing']
    },
    {
      iconSrc: '/assets/connector/azure.png',
      title: 'Azure Data Platform',
      description: 'Native integration with Azure Data Lake, Synapse Analytics, and Azure SQL databases',
      category: 'Microsoft Cloud',
      features: ['Data Lake Gen2', 'Synapse pipelines', 'Power BI dashboards']
    },
    {
      iconSrc: '/assets/connector/databricks.png',
      title: 'Databricks Platform',
      description: 'Advanced analytics and ML capabilities through Databricks unified data platform',
      category: 'Analytics & ML',
      features: ['Delta Lake', 'MLflow integration', 'Spark processing']
    }
  ];



  return (
    <Box sx={{ bgcolor: '#ffffff', py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="overline" 
            sx={{ 
              color: clientConfig.primaryColor,
              fontWeight: 600,
              letterSpacing: 1,
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
            }}
          >
            INTEGRATIONS & CONNECTORS
          </Typography>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 600,
              color: '#1f2937',
              mt: 2,
              mb: 3,
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
            }}
          >
            Connect Your Data Ecosystem
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#6b7280',
              fontWeight: 400,
              maxWidth: 700,
              mx: 'auto',
              fontSize: '21px',
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
            }}
          >
            Seamlessly integrate with leading pharmaceutical data platforms 
            and document management systems
          </Typography>
        </Box>

        {/* Main Integration Cards */}
        <Grid container spacing={4}>
          {integrations.map((integration, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  color: '#1f2937',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    border: `1px solid ${clientConfig.primaryColor}40`,
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={integration.iconSrc}
                      alt={`${integration.title} logo`}
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      mb: 2,
                      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}
                  >
                    {integration.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#6b7280',
                      lineHeight: 1.6,
                      mb: 3,
                      fontSize: '15px'
                    }}
                  >
                    {integration.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {integration.features.map((feature, idx) => (
                      <Typography 
                        key={idx}
                        variant="caption" 
                        sx={{ 
                          display: 'block',
                          color: clientConfig.primaryColor,
                          fontWeight: 500,
                          mb: 0.5,
                          fontSize: '13px'
                        }}
                      >
                        • {feature}
                      </Typography>
                    ))}
                  </Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#9ca3af',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      fontSize: '11px'
                    }}
                  >
                    {integration.category}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default IntegrationGrid;