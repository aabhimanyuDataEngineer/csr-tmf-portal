import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import CleanLayout from '../components/Layout/CleanLayout';
import FeatureGrid from '../components/Features/FeatureGrid';
import IntegrationGrid from '../components/Integrations/IntegrationGrid';
import { getCurrentClientConfig } from '../config/clientConfig';

const CleanDashboard: React.FC = () => {
  const clientConfig = getCurrentClientConfig();
  console.log('CleanDashboard loaded with config:', clientConfig);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <CleanLayout>
      {/* Hero Section with Background */}
      <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100vh - 80px)', // Adjust for fixed header
          background: `linear-gradient(135deg, 
            rgba(0, 0, 0, 1) 0%, 
            rgba(29, 29, 31, 1) 50%, 
            rgba(0, 0, 0, 1) 100%
          )`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            right: '8%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 122, 255, 0.1) 0%, transparent 70%)',
            zIndex: 1
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 149, 0, 0.08) 0%, transparent 70%)',
            zIndex: 1
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ color: 'white' }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 600,
                    mb: 4,
                    fontSize: { xs: '48px', md: '80px' },
                    lineHeight: { xs: 1.1, md: 1.05 },
                    letterSpacing: '-0.02em',
                    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                  }}
                >
                  Supercharged.
                  <br />
                  <Box component="span" sx={{
                    background: 'linear-gradient(90deg, #007AFF 0%, #5856D6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Clinical Documentation.
                  </Box>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 400,
                    mb: 6,
                    maxWidth: 650,
                    lineHeight: 1.5,
                    fontSize: { xs: '21px', md: '28px' },
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                  }}
                >
                  Revolutionary AI-powered platform for regulatory submissions.
                  Intelligent CSR authoring, automated TMF management, and
                  FDA-compliant workflows that transform pharmaceutical documentation.
                </Typography>

                <Box sx={{ display: 'flex', gap: 4, mb: 8, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={scrollToFeatures}
                    sx={{
                      bgcolor: clientConfig.primaryColor,
                      color: 'white',
                      px: 6,
                      py: 2,
                      fontSize: '19px',
                      textTransform: 'none',
                      fontWeight: 400,
                      borderRadius: '980px',
                      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                      '&:hover': {
                        bgcolor: clientConfig.primaryColor,
                        opacity: 0.9,
                        transform: 'scale(1.02)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Learn more
                  </Button>
                  <Button
                    variant="text"
                    size="large"
                    sx={{
                      color: clientConfig.primaryColor,
                      px: 4,
                      py: 2,
                      fontSize: '19px',
                      textTransform: 'none',
                      fontWeight: 400,
                      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                      '&:hover': {
                        bgcolor: 'transparent',
                        opacity: 0.8
                      }
                    }}
                  >
                    Watch the film →
                  </Button>
                </Box>


              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  position: 'relative'
                }}
              >
                {/* Apple-style Product Visualization */}
                <Box
                  sx={{
                    width: { xs: 300, md: 400 },
                    height: { xs: 300, md: 400 },
                    background: 'radial-gradient(circle at 30% 30%, rgba(0, 122, 255, 0.3) 0%, rgba(88, 86, 214, 0.2) 50%, transparent 70%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '80%',
                      height: '80%',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      borderRadius: '50%',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 20px 60px rgba(0, 122, 255, 0.3)',
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}
                    >
                      Med-AI
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features-section" sx={{ bgcolor: '#ffffff', py: 8 }}>
        <FeatureGrid />
      </Box>

      {/* Integrations Section */}
      <Box sx={{ bgcolor: '#ffffff' }}>
        <IntegrationGrid />
      </Box>

      {/* Latest News Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#1f2937',
            mb: 6,
            textAlign: 'center'
          }}
        >
          Latest from Our Platform
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                bgcolor: '#1e293b',
                color: 'white',
                border: '1px solid #334155',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="overline" sx={{ color: '#FFE082', fontWeight: 600 }}>
                  Press Release
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Platform Launches Advanced CSR Authoring with AI-Powered ICH E3 Compliance
                </Typography>
                <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                  New features deliver automated regulatory submissions with 99.9% compliance accuracy and 75% faster processing times.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                bgcolor: '#1e293b',
                color: 'white',
                border: '1px solid #334155',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="overline" sx={{ color: '#FFE082', fontWeight: 600 }}>
                  Case Study
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Leading Pharma Company Reduces TMF Preparation Time by 60%
                </Typography>
                <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                  Discover how automated TMF intelligence and compliance tracking transformed their regulatory workflow.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                bgcolor: '#1e293b',
                color: 'white',
                border: '1px solid #334155',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="overline" sx={{ color: '#FFE082', fontWeight: 600 }}>
                  Innovation
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Next-Gen Regulatory Intelligence Now Available
                </Typography>
                <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                  Advanced AI models now provide predictive insights for submission success and regulatory pathway optimization.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </CleanLayout>
  );
};

export default CleanDashboard;