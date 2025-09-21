import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { getCurrentClientConfig } from '../../config/clientConfig';

interface CleanLayoutProps {
  children: React.ReactNode;
}

const CleanLayout: React.FC<CleanLayoutProps> = ({ children }) => {
  const clientConfig = getCurrentClientConfig();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff' }}>
      {/* Top Navigation */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          zIndex: 1100
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: 0, py: 1 }}>
            {/* Logo Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 0.5
              }}>
                <Box
                  component="img"
                  src={clientConfig.clientLogo}
                  alt="Client Logo"
                  sx={{
                    height: 36,
                    width: 'auto',
                    maxWidth: 140,
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 36,
                  px: 1
                }}>
                  <Typography sx={{
                    color: '#d1d5db',
                    fontSize: '1.5rem',
                    fontWeight: 300,
                    lineHeight: 1
                  }}>
                    |
                  </Typography>
                </Box>
                <Box
                  component="img"
                  src={clientConfig.myLogo}
                  alt="UsefulBI Logo"
                  sx={{
                    height: 36,
                    width: 'auto',
                    maxWidth: 120,
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </Box>
            </Box>

            {/* Navigation Menu */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', gap: 4 }}>
                <Button
                  sx={{
                    color: 'rgba(0, 0, 0, 0.8)',
                    textTransform: 'none',
                    fontWeight: 400,
                    fontSize: '17px',
                    '&:hover': { bgcolor: 'transparent', color: '#000000' }
                  }}
                >
                  CSR Authoring
                </Button>
                <Button
                  sx={{
                    color: 'rgba(0, 0, 0, 0.8)',
                    textTransform: 'none',
                    fontWeight: 400,
                    fontSize: '17px',
                    '&:hover': { bgcolor: 'transparent', color: '#000000' }
                  }}
                >
                  TMF Management
                </Button>
                <Button
                  sx={{
                    color: 'rgba(0, 0, 0, 0.8)',
                    textTransform: 'none',
                    fontWeight: 400,
                    fontSize: '17px',
                    '&:hover': { bgcolor: 'transparent', color: '#000000' }
                  }}
                >
                  Regulatory Intelligence
                </Button>
                <Button
                  sx={{
                    color: 'rgba(0, 0, 0, 0.8)',
                    textTransform: 'none',
                    fontWeight: 400,
                    fontSize: '17px',
                    '&:hover': { bgcolor: 'transparent', color: '#000000' }
                  }}
                >
                  Compliance Hub
                </Button>
              </Box>
            </Box>

            {/* Right Actions */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  borderColor: 'rgba(0, 0, 0, 0.3)',
                  color: 'rgba(0, 0, 0, 0.8)',
                  fontSize: '17px',
                  fontWeight: 400,
                  '&:hover': {
                    borderColor: 'rgba(0, 0, 0, 0.6)',
                    bgcolor: 'transparent',
                    color: '#000000'
                  }
                }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  bgcolor: clientConfig.primaryColor,
                  fontSize: '17px',
                  fontWeight: 400,
                  '&:hover': {
                    bgcolor: clientConfig.primaryColor,
                    opacity: 0.9
                  },
                  boxShadow: 'none'
                }}
              >
                Get Started
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          minHeight: '100vh',
          paddingTop: '80px', // Account for fixed header height
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default CleanLayout;