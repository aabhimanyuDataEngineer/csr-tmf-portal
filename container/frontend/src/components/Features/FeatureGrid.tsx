import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Description,
  Search,
  Psychology,
  Security,
  Settings,
  Chat,
  AccountTree,
} from '@mui/icons-material';
import { getCurrentClientConfig } from '../../config/clientConfig';

const FeatureGrid: React.FC = () => {
  const clientConfig = getCurrentClientConfig();

  const features = [
    {
      icon: <Description />,
      title: 'Automated Content Generation',
      description: 'Generate comprehensive CSR and TMF documents using advanced AI with built-in regulatory compliance validation',
      category: 'Document Authoring'
    },
    {
      icon: <Psychology />,
      title: 'Dynamic Content Editing',
      description: 'Modify and regenerate specific sections of clinical documents while maintaining regulatory integrity',
      category: 'Content Optimization'
    },
    {
      icon: <Security />,
      title: 'End-to-End Audit Trails',
      description: 'Comprehensive tracking and documentation of all changes with full regulatory compliance support',
      category: 'Quality Assurance'
    },
    {
      icon: <Search />,
      title: 'Advanced Content Discovery',
      description: 'Powerful search capabilities across all clinical documents with contextual understanding',
      category: 'Information Retrieval'
    },
    {
      icon: <Settings />,
      title: 'Standardized Document Templates',
      description: 'Industry-standard templates for ICH E3 CSR formats and TMF organizational structures',
      category: 'Regulatory Standards'
    },
    {
      icon: <Chat />,
      title: 'AI Clinical Assistant',
      description: 'Intelligent chatbot for instant answers about regulatory requirements, document status, and compliance guidance',
      category: 'AI Assistant'
    },
    {
      icon: <AccountTree />,
      title: 'Workflow Automation',
      description: 'Automated document routing, approval workflows, and submission processes for regulatory compliance',
      category: 'Process Automation'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="overline" 
          sx={{ 
            color: clientConfig.primaryColor,
            fontWeight: 600,
            letterSpacing: 1
          }}
        >
          FEATURES
        </Typography>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700,
            color: '#1f2937',
            mt: 1,
            mb: 2
          }}
        >
          Regulatory Medical Writing Suite
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#6b7280',
            fontWeight: 400,
            maxWidth: 700,
            mx: 'auto'
          }}
        >
          Accelerate drug development with AI-powered clinical documentation, 
          regulatory compliance automation, and intelligent submission management
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                border: '1px solid #f3f4f6',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out'
                },
                borderRadius: 2
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: `${clientConfig.primaryColor}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    color: clientConfig.primaryColor
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    color: '#1f2937',
                    mb: 1
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#6b7280',
                    lineHeight: 1.6,
                    mb: 2
                  }}
                >
                  {feature.description}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: clientConfig.primaryColor,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5
                  }}
                >
                  {feature.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeatureGrid;