import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Autocomplete,
  IconButton,

  Divider,
} from '@mui/material';
import {
  Search,
  ExpandMore,
  FilterList,
  Clear,
  Psychology,
  TextFields,
  AutoAwesome,
} from '@mui/icons-material';
import { SearchType, DocumentType, SearchFilters } from '../../types';

interface SearchInterfaceProps {
  onSearch: (query: string, searchType: SearchType, filters: SearchFilters) => void;
  loading?: boolean;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSearch, loading = false }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>(SearchType.HYBRID);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for filters
  const studyOptions = ['ABC-001', 'DEF-002', 'GHI-003', 'JKL-004'];
  const csrSectionCodes = ['1.0 Synopsis', '2.0 Introduction', '3.0 Objectives', '4.0 Methods'];
  const tmfSectionCodes = ['Z1 Trial Management', 'Z2 Central Documents', 'Z3 Site Files'];

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query, searchType, filters);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getSearchTypeIcon = (type: SearchType) => {
    switch (type) {
      case SearchType.KEYWORD:
        return <TextFields />;
      case SearchType.SEMANTIC:
        return <Psychology />;
      case SearchType.HYBRID:
        return <AutoAwesome />;
      default:
        return <Search />;
    }
  };

  const getSearchTypeDescription = (type: SearchType) => {
    switch (type) {
      case SearchType.KEYWORD:
        return 'Exact text matching for precise term searches';
      case SearchType.SEMANTIC:
        return 'AI-powered meaning-based search for conceptual matches';
      case SearchType.HYBRID:
        return 'Combined keyword and semantic search for best results';
      default:
        return '';
    }
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Advanced Search
        </Typography>

        {/* Search Input */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search clinical documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              endAdornment: query && (
                <IconButton size="small" onClick={() => setQuery('')}>
                  <Clear />
                </IconButton>
              ),
            }}
            sx={{ mb: 2 }}
          />

          {/* Search Type Selection */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Search Mode
            </Typography>
            <ToggleButtonGroup
              value={searchType}
              exclusive
              onChange={(_, newType) => newType && setSearchType(newType)}
              size="small"
              fullWidth
            >
              <ToggleButton value={SearchType.KEYWORD}>
                <TextFields sx={{ mr: 1 }} />
                Keyword
              </ToggleButton>
              <ToggleButton value={SearchType.SEMANTIC}>
                <Psychology sx={{ mr: 1 }} />
                Semantic
              </ToggleButton>
              <ToggleButton value={SearchType.HYBRID}>
                <AutoAwesome sx={{ mr: 1 }} />
                Hybrid
              </ToggleButton>
            </ToggleButtonGroup>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {getSearchTypeDescription(searchType)}
            </Typography>
          </Box>

          {/* Search Button */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSearch}
            disabled={!query.trim() || loading}
            startIcon={getSearchTypeIcon(searchType)}
          >
            {loading ? 'Searching...' : 'Search Documents'}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Advanced Filters */}
        <Accordion expanded={showFilters} onChange={() => setShowFilters(!showFilters)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterList />
              <Typography variant="subtitle2">Advanced Filters</Typography>
              {activeFiltersCount > 0 && (
                <Chip
                  size="small"
                  label={`${activeFiltersCount} active`}
                  color="primary"
                  variant="outlined"
                />
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Document Type Filter */}
              <FormControl fullWidth size="small">
                <InputLabel>Document Type</InputLabel>
                <Select
                  value={filters.documentType || ''}
                  onChange={(e) => setFilters({ ...filters, documentType: e.target.value as DocumentType })}
                  input={<OutlinedInput label="Document Type" />}
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value={DocumentType.CSR}>Clinical Study Reports (CSR)</MenuItem>
                  <MenuItem value={DocumentType.TMF}>Trial Master Files (TMF)</MenuItem>
                </Select>
              </FormControl>

              {/* Study ID Filter */}
              <Autocomplete
                size="small"
                options={studyOptions}
                value={filters.studyId || null}
                onChange={(_, newValue) => setFilters({ ...filters, studyId: newValue || undefined })}
                renderInput={(params) => (
                  <TextField {...params} label="Study ID" placeholder="Select study..." />
                )}
              />

              {/* Section Codes Filter */}
              <Autocomplete
                size="small"
                multiple
                options={filters.documentType === DocumentType.TMF ? tmfSectionCodes : csrSectionCodes}
                value={filters.sectionCodes || []}
                onChange={(_, newValue) => setFilters({ ...filters, sectionCodes: newValue })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Section Codes"
                    placeholder={
                      filters.documentType === DocumentType.TMF
                        ? "Select TMF zones..."
                        : "Select CSR sections..."
                    }
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      size="small"
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />

              {/* Clear Filters Button */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={clearFilters}
                  startIcon={<Clear />}
                >
                  Clear All Filters
                </Button>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Search Tips */}
        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            <strong>Search Tips:</strong> Use quotes for exact phrases, combine terms with AND/OR,
            or try semantic search for concept-based matching across clinical terminology.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchInterface;