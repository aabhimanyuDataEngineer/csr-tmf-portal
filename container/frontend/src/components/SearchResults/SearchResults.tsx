import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,

  LinearProgress,
} from '@mui/material';
import {
  Description,
  OpenInNew,
  BookmarkBorder,
  Share,
  MoreVert,
  TrendingUp,

} from '@mui/icons-material';
import { SearchResult, SearchType } from '../../types';

interface SearchResultsProps {
  results: SearchResult[];
  searchType: SearchType;
  loading?: boolean;
  totalCount?: number;
  queryTime?: number;
}

// Mock search results for demonstration
const mockResults: SearchResult[] = [
  {
    documentId: 'csr-001-synopsis',
    title: 'Study ABC-001 Synopsis - Primary Efficacy Analysis',
    snippet: 'This randomized, double-blind, placebo-controlled study evaluated the efficacy and safety of investigational drug XYZ-123 in patients with moderate to severe condition...',
    relevanceScore: 0.95,
    citations: [
      {
        id: 'cite-1',
        documentId: 'csr-001-synopsis',
        pageNumber: 3,
        sectionReference: '1.2 Primary Objectives',
        text: 'Primary efficacy endpoint was achieved with statistical significance (p<0.001)',
        confidence: 0.92,
      },
    ],
    highlights: [
      { start: 45, end: 67, text: 'placebo-controlled study' },
      { start: 89, end: 97, text: 'efficacy' },
    ],
  },
  {
    documentId: 'csr-001-methods',
    title: 'Study ABC-001 Methods - Statistical Analysis Plan',
    snippet: 'The statistical analysis was performed using the intention-to-treat population. Primary analysis utilized ANCOVA model with baseline covariates including age, gender, and disease severity...',
    relevanceScore: 0.87,
    citations: [
      {
        id: 'cite-2',
        documentId: 'csr-001-methods',
        pageNumber: 15,
        sectionReference: '4.3 Statistical Methods',
        text: 'ANCOVA model demonstrated significant treatment effect (F=12.34, p<0.001)',
        confidence: 0.89,
      },
    ],
    highlights: [
      { start: 4, end: 23, text: 'statistical analysis' },
      { start: 89, end: 101, text: 'ANCOVA model' },
    ],
  },
  {
    documentId: 'tmf-001-protocol',
    title: 'TMF Zone 2 - Clinical Study Protocol v3.0',
    snippet: 'Protocol amendment 3.0 includes updated inclusion criteria and modified primary endpoint definition. The study design remains a multicenter, randomized controlled trial...',
    relevanceScore: 0.82,
    citations: [
      {
        id: 'cite-3',
        documentId: 'tmf-001-protocol',
        pageNumber: 8,
        sectionReference: 'Section 3.1 Study Design',
        text: 'Multicenter design with 15 investigational sites across North America',
        confidence: 0.85,
      },
    ],
    highlights: [
      { start: 0, end: 18, text: 'Protocol amendment' },
      { start: 67, end: 84, text: 'primary endpoint' },
    ],
  },
];

const SearchResults: React.FC<SearchResultsProps> = ({
  results = mockResults,
  searchType,
  loading = false,
  totalCount = mockResults.length,
  queryTime = 245,
}) => {
  const getSearchTypeColor = (type: SearchType) => {
    switch (type) {
      case SearchType.KEYWORD:
        return 'primary';
      case SearchType.SEMANTIC:
        return 'secondary';
      case SearchType.HYBRID:
        return 'success';
      default:
        return 'default';
    }
  };

  const formatRelevanceScore = (score: number) => {
    return `${Math.round(score * 100)}%`;
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Searching...
          </Typography>
          <LinearProgress />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Analyzing clinical documents with AI-powered search...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Search Results
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              size="small"
              label={searchType.toUpperCase()}
              color={getSearchTypeColor(searchType)}
              variant="outlined"
            />
            <Typography variant="caption" color="text.secondary">
              {totalCount} results in {queryTime}ms
            </Typography>
          </Box>
        </Box>

        {results.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No documents found matching your search criteria.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your search terms or filters.
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {results.map((result, index) => (
              <React.Fragment key={result.documentId}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 2,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{ mt: 1 }}>
                    <Description color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography
                          variant="subtitle1"
                          component="h3"
                          sx={{ fontWeight: 600, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                        >
                          {result.title}
                        </Typography>
                        <Chip
                          size="small"
                          label={formatRelevanceScore(result.relevanceScore)}
                          color="success"
                          variant="outlined"
                          icon={<TrendingUp />}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                          {result.snippet}
                        </Typography>
                        
                        {/* Citations */}
                        {result.citations.length > 0 && (
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                              Citations:
                            </Typography>
                            {result.citations.map((citation) => (
                              <Chip
                                key={citation.id}
                                size="small"
                                label={`Page ${citation.pageNumber}: ${citation.sectionReference}`}
                                variant="outlined"
                                sx={{ ml: 1, mt: 0.5 }}
                                onClick={() => console.log('Navigate to citation:', citation)}
                              />
                            ))}
                          </Box>
                        )}

                        {/* Highlights */}
                        {result.highlights.length > 0 && (
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                              Matches:
                            </Typography>
                            {result.highlights.map((highlight, idx) => (
                              <Chip
                                key={idx}
                                size="small"
                                label={highlight.text}
                                color="primary"
                                variant="outlined"
                                sx={{ ml: 1, mt: 0.5 }}
                              />
                            ))}
                          </Box>
                        )}

                        {/* Actions */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <Tooltip title="Open Document">
                            <IconButton size="small" color="primary">
                              <OpenInNew />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Bookmark">
                            <IconButton size="small">
                              <BookmarkBorder />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Share">
                            <IconButton size="small">
                              <Share />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="More Options">
                            <IconButton size="small">
                              <MoreVert />
                            </IconButton>
                          </Tooltip>
                          <Box sx={{ flexGrow: 1 }} />
                          <Typography variant="caption" color="text.secondary">
                            Document ID: {result.documentId}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < results.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}

        {/* Search Analytics */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            <strong>Search Analytics:</strong> Results ranked by relevance using {searchType} search.
            All searches are logged for audit compliance and performance optimization.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchResults;