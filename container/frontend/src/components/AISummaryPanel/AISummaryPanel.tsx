import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  LinearProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from '@mui/material';
import {
  AutoAwesome,
  ExpandMore,
  ContentCopy,
  Download,
  Refresh,
  Psychology,
  Verified,
  Warning,
  Link,
  Settings,
} from '@mui/icons-material';

interface AISummaryPanelProps {
  documentId?: string;
  onGenerateSummary?: (params: SummaryParams) => void;
}

interface SummaryParams {
  maxLength: number;
  includeCitations: boolean;
  modelType: string;
  preserveClinicalTerms: boolean;
}

// Mock summary data
const mockSummary = {
  id: 'summary-001',
  content: `This Phase III randomized controlled trial evaluated the efficacy and safety of investigational drug XYZ-123 in 450 patients with moderate to severe chronic condition. The study met its primary endpoint, demonstrating statistically significant improvement in the primary efficacy measure compared to placebo (p<0.001).

Key findings include:
• 65% of patients achieved clinical response vs 23% placebo
• Significant improvement in quality of life scores (p<0.001)
• Acceptable safety profile with no new safety signals
• Treatment effect consistent across subgroups

The study supports the benefit-risk profile of XYZ-123 for the intended patient population and provides robust evidence for regulatory submission.`,
  citations: [
    {
      id: 'cite-1',
      documentId: 'csr-001-synopsis',
      pageNumber: 3,
      sectionReference: '1.2 Primary Objectives',
      text: 'Primary efficacy endpoint was achieved with statistical significance (p<0.001)',
      confidence: 0.95,
    },
    {
      id: 'cite-2',
      documentId: 'csr-001-results',
      pageNumber: 45,
      sectionReference: '6.1 Efficacy Results',
      text: '65% of patients in the treatment group achieved clinical response',
      confidence: 0.92,
    },
    {
      id: 'cite-3',
      documentId: 'csr-001-safety',
      pageNumber: 67,
      sectionReference: '7.2 Safety Profile',
      text: 'No new safety signals were identified during the study period',
      confidence: 0.88,
    },
  ],
  modelInfo: {
    modelId: 'anthropic.claude-3-sonnet',
    provider: 'AWS Bedrock',
    parameters: {
      temperature: 0.1,
      maxTokens: 1000,
    },
    inferenceTime: 2340,
    confidenceScore: 0.91,
  },
  generatedAt: new Date().toISOString(),
};

const AISummaryPanel: React.FC<AISummaryPanelProps> = ({
  documentId,
  onGenerateSummary,
}) => {
  const [loading, setLoading] = useState(false);
  const [summary] = useState(mockSummary);
  const [showSettings, setShowSettings] = useState(false);
  const [params, setParams] = useState<SummaryParams>({
    maxLength: 500,
    includeCitations: true,
    modelType: 'claude-3-sonnet',
    preserveClinicalTerms: true,
  });

  const handleGenerateSummary = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (onGenerateSummary) {
        onGenerateSummary(params);
      }
    }, 3000);
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summary.content);
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 0.9) return 'success';
    if (score >= 0.7) return 'warning';
    return 'error';
  };

  const getConfidenceIcon = (score: number) => {
    if (score >= 0.9) return <Verified />;
    if (score >= 0.7) return <Warning />;
    return <Warning />;
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesome color="primary" />
            AI Summary
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Summary Settings">
              <IconButton
                size="small"
                onClick={() => setShowSettings(!showSettings)}
                color={showSettings ? 'primary' : 'default'}
              >
                <Settings />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              size="small"
              onClick={handleGenerateSummary}
              disabled={loading || !documentId}
              startIcon={loading ? <Psychology /> : <AutoAwesome />}
            >
              {loading ? 'Generating...' : 'Generate Summary'}
            </Button>
          </Box>
        </Box>

        {/* Summary Settings */}
        <Accordion expanded={showSettings} onChange={() => setShowSettings(!showSettings)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2">Summary Configuration</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl size="small" fullWidth>
                <InputLabel>AI Model</InputLabel>
                <Select
                  value={params.modelType}
                  onChange={(e) => setParams({ ...params, modelType: e.target.value })}
                  label="AI Model"
                >
                  <MenuItem value="claude-3-sonnet">Claude 3 Sonnet (Recommended)</MenuItem>
                  <MenuItem value="claude-3-haiku">Claude 3 Haiku (Fast)</MenuItem>
                  <MenuItem value="titan-text">Amazon Titan Text</MenuItem>
                </Select>
              </FormControl>

              <Box>
                <Typography variant="body2" gutterBottom>
                  Summary Length: {params.maxLength} words
                </Typography>
                <Slider
                  value={params.maxLength}
                  onChange={(_, value) => setParams({ ...params, maxLength: value as number })}
                  min={100}
                  max={1000}
                  step={50}
                  marks={[
                    { value: 100, label: 'Brief' },
                    { value: 500, label: 'Standard' },
                    { value: 1000, label: 'Detailed' },
                  ]}
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {loading && (
          <Box sx={{ my: 2 }}>
            <LinearProgress />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
              AI is analyzing the document and generating summary with citations...
            </Typography>
          </Box>
        )}

        {!loading && summary && (
          <Box>
            <Divider sx={{ my: 2 }} />
            
            {/* Summary Content */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {summary.content}
              </Typography>
            </Box>

            {/* Citations */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Link />
                Citations & Provenance
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {summary.citations.map((citation) => (
                  <Tooltip
                    key={citation.id}
                    title={`${citation.text} (Confidence: ${Math.round(citation.confidence * 100)}%)`}
                  >
                    <Chip
                      size="small"
                      label={`Page ${citation.pageNumber}: ${citation.sectionReference}`}
                      variant="outlined"
                      color="primary"
                      clickable
                      onClick={() => console.log('Navigate to citation:', citation)}
                    />
                  </Tooltip>
                ))}
              </Box>
            </Box>

            {/* Model Information */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                AI Model Information
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                <Chip
                  size="small"
                  label={`${summary.modelInfo.provider}: ${summary.modelInfo.modelId}`}
                  variant="outlined"
                />
                <Chip
                  size="small"
                  label={`${summary.modelInfo.inferenceTime}ms`}
                  variant="outlined"
                />
                <Chip
                  size="small"
                  label={`Confidence: ${Math.round(summary.modelInfo.confidenceScore * 100)}%`}
                  color={getConfidenceColor(summary.modelInfo.confidenceScore)}
                  variant="outlined"
                  icon={getConfidenceIcon(summary.modelInfo.confidenceScore)}
                />
              </Box>
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                size="small"
                startIcon={<ContentCopy />}
                onClick={handleCopySummary}
              >
                Copy Summary
              </Button>
              <Button
                size="small"
                startIcon={<Download />}
              >
                Export
              </Button>
              <Button
                size="small"
                startIcon={<Refresh />}
                onClick={handleGenerateSummary}
              >
                Regenerate
              </Button>
            </Box>

            {/* Compliance Notice */}
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="caption">
                <strong>Regulatory Compliance:</strong> This AI-generated summary maintains full provenance 
                to source documents. All citations are traceable for audit purposes and regulatory submissions.
                Generated on {new Date(summary.generatedAt).toLocaleString()}.
              </Typography>
            </Alert>
          </Box>
        )}

        {!loading && !summary && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Psychology sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Select a document to generate an AI-powered summary
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Summaries include citations and maintain full regulatory compliance
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AISummaryPanel;