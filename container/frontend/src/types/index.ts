// Core type definitions for the Clinical Documentation Portal

export enum DocumentType {
  CSR = 'CSR',
  TMF = 'TMF'
}

export enum SearchType {
  KEYWORD = 'keyword',
  SEMANTIC = 'semantic',
  HYBRID = 'hybrid'
}

export interface DocumentNode {
  id: string;
  title: string;
  type: 'section' | 'document';
  children?: DocumentNode[];
  metadata: DocumentMetadata;
}

export interface DocumentMetadata {
  studyId: string;
  sectionCode: string;
  version: string;
  createdDate: string;
  modifiedDate: string;
  fileSize: number;
  status: 'active' | 'archived' | 'draft';
  regulatoryClassification: string;
  accessLevel: string;
}

export interface SearchFilters {
  documentType?: DocumentType;
  studyId?: string;
  sectionCodes?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface SearchQuery {
  text: string;
  type: SearchType;
  filters: SearchFilters;
}

export interface Citation {
  id: string;
  documentId: string;
  pageNumber: number;
  sectionReference: string;
  text: string;
  confidence: number;
}

export interface SearchResult {
  documentId: string;
  title: string;
  snippet: string;
  relevanceScore: number;
  citations: Citation[];
  highlights: Array<{
    start: number;
    end: number;
    text: string;
  }>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}