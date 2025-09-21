import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,

  Chip,

  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from '@mui/material';
import {
  ExpandMore,
  Description,
  Folder,
  FolderOpen,
  Info,
  CheckCircle,
  Schedule,
  Archive,
} from '@mui/icons-material';
import { DocumentType, DocumentNode } from '../../types';

interface DocumentNavigatorProps {
  documentType: DocumentType;
  onTypeChange: (type: DocumentType) => void;
  studyId?: string;
}

// Mock data for demonstration
const mockCSRDocuments: DocumentNode[] = [
  {
    id: 'csr-study-001',
    title: 'Study ABC-001: Phase III Efficacy Trial',
    type: 'document',
    metadata: {
      studyId: 'ABC-001',
      sectionCode: 'CSR',
      version: '2.1',
      createdDate: '2024-01-15',
      modifiedDate: '2024-03-10',
      fileSize: 15728640,
      status: 'active',
      regulatoryClassification: 'Confidential',
      accessLevel: 'Level 2',
    },
    children: [
      {
        id: 'csr-001-synopsis',
        title: '1. Synopsis',
        type: 'section',
        metadata: {
          studyId: 'ABC-001',
          sectionCode: '1.0',
          version: '2.1',
          createdDate: '2024-01-15',
          modifiedDate: '2024-03-10',
          fileSize: 524288,
          status: 'active',
          regulatoryClassification: 'Confidential',
          accessLevel: 'Level 2',
        },
      },
      {
        id: 'csr-001-introduction',
        title: '2. Introduction',
        type: 'section',
        metadata: {
          studyId: 'ABC-001',
          sectionCode: '2.0',
          version: '2.1',
          createdDate: '2024-01-15',
          modifiedDate: '2024-03-10',
          fileSize: 1048576,
          status: 'active',
          regulatoryClassification: 'Confidential',
          accessLevel: 'Level 2',
        },
      },
      {
        id: 'csr-001-objectives',
        title: '3. Study Objectives',
        type: 'section',
        metadata: {
          studyId: 'ABC-001',
          sectionCode: '3.0',
          version: '2.1',
          createdDate: '2024-01-15',
          modifiedDate: '2024-03-10',
          fileSize: 786432,
          status: 'active',
          regulatoryClassification: 'Confidential',
          accessLevel: 'Level 2',
        },
      },
    ],
  },
];

const mockTMFDocuments: DocumentNode[] = [
  {
    id: 'tmf-study-001',
    title: 'Study ABC-001: TMF Collection',
    type: 'document',
    metadata: {
      studyId: 'ABC-001',
      sectionCode: 'TMF',
      version: '1.0',
      createdDate: '2024-01-10',
      modifiedDate: '2024-03-15',
      fileSize: 52428800,
      status: 'active',
      regulatoryClassification: 'Confidential',
      accessLevel: 'Level 2',
    },
    children: [
      {
        id: 'tmf-001-zone1',
        title: 'Zone 1: Trial Management',
        type: 'section',
        metadata: {
          studyId: 'ABC-001',
          sectionCode: 'Z1',
          version: '1.0',
          createdDate: '2024-01-10',
          modifiedDate: '2024-03-15',
          fileSize: 10485760,
          status: 'active',
          regulatoryClassification: 'Confidential',
          accessLevel: 'Level 2',
        },
      },
      {
        id: 'tmf-001-zone2',
        title: 'Zone 2: Central Trial Documents',
        type: 'section',
        metadata: {
          studyId: 'ABC-001',
          sectionCode: 'Z2',
          version: '1.0',
          createdDate: '2024-01-10',
          modifiedDate: '2024-03-15',
          fileSize: 20971520,
          status: 'active',
          regulatoryClassification: 'Confidential',
          accessLevel: 'Level 2',
        },
      },
      {
        id: 'tmf-001-zone3',
        title: 'Zone 3: Investigator Site Files',
        type: 'section',
        metadata: {
          studyId: 'ABC-001',
          sectionCode: 'Z3',
          version: '1.0',
          createdDate: '2024-01-10',
          modifiedDate: '2024-03-15',
          fileSize: 20971520,
          status: 'active',
          regulatoryClassification: 'Confidential',
          accessLevel: 'Level 2',
        },
      },
    ],
  },
];

const DocumentNavigator: React.FC<DocumentNavigatorProps> = ({
  documentType,
  onTypeChange,
  studyId,
}) => {


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle color="success" fontSize="small" />;
      case 'draft':
        return <Schedule color="warning" fontSize="small" />;
      case 'archived':
        return <Archive color="disabled" fontSize="small" />;
      default:
        return <Info color="info" fontSize="small" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };



  const currentDocuments = documentType === DocumentType.CSR ? mockCSRDocuments : mockTMFDocuments;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Document Navigator
          </Typography>
          <ToggleButtonGroup
            value={documentType}
            exclusive
            onChange={(_, newType) => newType && onTypeChange(newType)}
            aria-label="document type"
            size="small"
            fullWidth
          >
            <ToggleButton value={DocumentType.CSR} aria-label="CSR documents">
              <Description sx={{ mr: 1 }} />
              Clinical Study Reports
            </ToggleButton>
            <ToggleButton value={DocumentType.TMF} aria-label="TMF documents">
              <Folder sx={{ mr: 1 }} />
              Trial Master Files
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2">
              {documentType === DocumentType.CSR ? 'ICH E3 Structure' : 'TMF Reference Model'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
              {currentDocuments.map((doc) => (
                <Box key={doc.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 1, cursor: 'pointer' }}>
                    <FolderOpen sx={{ mr: 1, color: 'primary.main' }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {doc.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Chip
                          size="small"
                          label={`v${doc.metadata.version}`}
                          variant="outlined"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                        <Chip
                          size="small"
                          label={formatFileSize(doc.metadata.fileSize)}
                          variant="outlined"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                        <Tooltip title={`Status: ${doc.metadata.status}`}>
                          {getStatusIcon(doc.metadata.status)}
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                  {doc.children && (
                    <Box sx={{ ml: 3 }}>
                      {doc.children.map((child) => (
                        <Box key={child.id} sx={{ display: 'flex', alignItems: 'center', py: 0.5, cursor: 'pointer' }}>
                          <Description sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">{child.title}</Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {documentType === DocumentType.CSR 
              ? 'Following ICH E3 guidelines for Clinical Study Report structure'
              : 'Following TMF Reference Model for Trial Master File organization'
            }
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DocumentNavigator;