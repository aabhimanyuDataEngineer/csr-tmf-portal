import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  Description,
  Search,
  Psychology,
  Security,
} from '@mui/icons-material';
import AppLayout from '../components/Layout/AppLayout';
import DocumentNavigator from '../components/DocumentNavigator/DocumentNavigator';
import SearchInterface from '../components/SearchInterface/SearchInterface';
import SearchResults from '../components/SearchResults/SearchResults';
import AISummaryPanel from '../components/AISummaryPanel/AISummaryPanel';
import { DocumentType, SearchType, SearchFilters } from '../types';

const Dashboard: React.FC = () => {
  const [documentType, setDocumentType] = useState<DocumentType>(DocumentType.CSR);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async (query: string, searchType: SearchType, filters: SearchFilters) => {
    setSearchLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchLoading(false);
      // Mock results would be set here
    }, 2000);
  };

  const handleDocumentTypeChange = (type: DocumentType) => {
    setDocumentType(type);
  };

  // Mock statistics for dashboard
  const stats = [
    {
      title: 'Total Documents',
      value: '1,247',
      change: '+12%',
      icon: <Description />,
      color: 'primary',
    },
    {
      title: 'Search Queries Today',
      value: '89',
      change: '+23%',
      icon: <Search />,
      color: 'secondary',
    },
    {
      title: 'AI Summaries Generated',
      value: '34',
      change: '+45%',
      icon: <Psychology />,
      color: 'success',
    },
    {
      title: 'Audit Events',
      value: '156',
      change: '+8%',
      icon: <Security />,
      color: 'warning',
    },
  ];

  return (
    <AppLayout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Clinical Documentation Portal
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI-powered document management for CSR and TMF with regulatory compliance
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Chip
                      size="small"
                      label={stat.change}
                      color={stat.color as any}
                      variant="outlined"
                      icon={<TrendingUp />}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Box sx={{ color: `${stat.color}.main` }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Left Column - Document Navigator */}
        <Grid item xs={12} md={3}>
          <DocumentNavigator
            documentType={documentType}
            onTypeChange={handleDocumentTypeChange}
          />
        </Grid>

        {/* Middle Column - Search and Results */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <SearchInterface
              onSearch={handleSearch}
              loading={searchLoading}
            />
            <SearchResults
              results={[]}
              searchType={SearchType.HYBRID}
              loading={searchLoading}
            />
          </Box>
        </Grid>

        {/* Right Column - AI Summary Panel */}
        <Grid item xs={12} md={3}>
          <AISummaryPanel
            documentId="csr-001-synopsis"
          />
        </Grid>
      </Grid>

      {/* System Status */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            System Status
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Document Processing
                </Typography>
                <LinearProgress variant="determinate" value={85} sx={{ mt: 1 }} />
                <Typography variant="caption">85% Complete</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Search Index Health
                </Typography>
                <LinearProgress variant="determinate" value={98} color="success" sx={{ mt: 1 }} />
                <Typography variant="caption">98% Healthy</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  AI Model Availability
                </Typography>
                <LinearProgress variant="determinate" value={100} color="success" sx={{ mt: 1 }} />
                <Typography variant="caption">100% Available</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Compliance Score
                </Typography>
                <LinearProgress variant="determinate" value={96} color="success" sx={{ mt: 1 }} />
                <Typography variant="caption">96% Compliant</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Dashboard;