"""
Abstract base classes for configurable AI/ML and search providers.
Enables runtime switching between different provider implementations.
"""

from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional, Union
from pydantic import BaseModel
from datetime import datetime
from enum import Enum


class SearchType(str, Enum):
    """Supported search types."""
    KEYWORD = "keyword"
    SEMANTIC = "semantic"
    HYBRID = "hybrid"


class DocumentType(str, Enum):
    """Document types following clinical standards."""
    CSR = "CSR"  # Clinical Study Report (ICH E3)
    TMF = "TMF"  # Trial Master File


class SearchFilters(BaseModel):
    """Search filter parameters."""
    document_type: Optional[DocumentType] = None
    study_id: Optional[str] = None
    section_codes: Optional[List[str]] = None
    date_range: Optional[Dict[str, datetime]] = None
    access_level: Optional[str] = None


class SearchQuery(BaseModel):
    """Search query with filters and parameters."""
    text: str
    search_type: SearchType = SearchType.KEYWORD
    filters: SearchFilters = SearchFilters()
    limit: int = 20
    offset: int = 0


class TextHighlight(BaseModel):
    """Text highlighting information."""
    start_pos: int
    end_pos: int
    text: str
    score: float


class Citation(BaseModel):
    """Citation with provenance information."""
    citation_id: str
    document_id: str
    page_number: int
    section_reference: str
    text_excerpt: str
    confidence_score: float
    provenance_chain: List[str]
    created_at: datetime


class SearchResult(BaseModel):
    """Individual search result."""
    document_id: str
    title: str
    snippet: str
    relevance_score: float
    citations: List[Citation]
    highlights: List[TextHighlight]
    metadata: Dict[str, Any]


class SearchResponse(BaseModel):
    """Complete search response."""
    results: List[SearchResult]
    total_count: int
    query_time_ms: int
    search_type: SearchType
    filters_applied: SearchFilters


class EmbeddingRequest(BaseModel):
    """Request for text embedding generation."""
    text: str
    model_type: str = "default"
    normalize: bool = True


class EmbeddingResponse(BaseModel):
    """Response containing text embeddings."""
    embedding: List[float]
    model_info: Dict[str, Any]
    dimension: int
    generated_at: datetime


class SummarizationRequest(BaseModel):
    """Request for AI text summarization."""
    document_id: str
    section_ids: Optional[List[str]] = None
    max_length: int = 500
    include_citations: bool = True
    model_parameters: Dict[str, Any] = {}
    preserve_clinical_terms: bool = True


class ModelProvenance(BaseModel):
    """AI model provenance information."""
    model_id: str
    model_version: str
    provider: str
    parameters: Dict[str, Any]
    inference_time_ms: int
    confidence_metrics: Dict[str, float]


class SummaryResponse(BaseModel):
    """AI-generated summary with provenance."""
    summary_id: str
    content: str
    citations: List[Citation]
    model_info: ModelProvenance
    generated_at: datetime
    confidence_metrics: Dict[str, float]


class VectorMatch(BaseModel):
    """Vector similarity search match."""
    document_id: str
    chunk_id: str
    similarity_score: float
    content: str
    metadata: Dict[str, Any]


# Abstract Provider Interfaces

class SearchProvider(ABC):
    """Abstract base class for search providers."""
    
    @abstractmethod
    async def initialize(self, config: Dict[str, Any]) -> None:
        """Initialize the search provider with configuration."""
        pass
    
    @abstractmethod
    async def search(self, query: SearchQuery) -> SearchResponse:
        """Perform search operation."""
        pass
    
    @abstractmethod
    async def get_suggestions(self, partial_query: str, limit: int = 10) -> List[str]:
        """Get search suggestions for autocomplete."""
        pass
    
    @abstractmethod
    async def health_check(self) -> bool:
        """Check provider health status."""
        pass


class VectorProvider(ABC):
    """Abstract base class for vector search providers."""
    
    @abstractmethod
    async def initialize(self, config: Dict[str, Any]) -> None:
        """Initialize the vector provider with configuration."""
        pass
    
    @abstractmethod
    async def similarity_search(
        self, 
        embedding: List[float], 
        filters: Optional[Dict[str, Any]] = None,
        limit: int = 10
    ) -> List[VectorMatch]:
        """Perform vector similarity search."""
        pass
    
    @abstractmethod
    async def index_document(
        self, 
        document_id: str, 
        chunks: List[Dict[str, Any]]
    ) -> bool:
        """Index document chunks for vector search."""
        pass
    
    @abstractmethod
    async def delete_document(self, document_id: str) -> bool:
        """Remove document from vector index."""
        pass
    
    @abstractmethod
    async def health_check(self) -> bool:
        """Check provider health status."""
        pass


class AIProvider(ABC):
    """Abstract base class for AI/ML providers."""
    
    @abstractmethod
    async def initialize(self, config: Dict[str, Any]) -> None:
        """Initialize the AI provider with configuration."""
        pass
    
    @abstractmethod
    async def generate_summary(self, request: SummarizationRequest) -> SummaryResponse:
        """Generate text summary with citations."""
        pass
    
    @abstractmethod
    async def generate_embeddings(self, request: EmbeddingRequest) -> EmbeddingResponse:
        """Generate text embeddings."""
        pass
    
    @abstractmethod
    async def health_check(self) -> bool:
        """Check provider health status."""
        pass


class ProviderFactory:
    """Factory for creating provider instances based on configuration."""
    
    _search_providers: Dict[str, type] = {}
    _vector_providers: Dict[str, type] = {}
    _ai_providers: Dict[str, type] = {}
    
    @classmethod
    def register_search_provider(cls, name: str, provider_class: type):
        """Register a search provider implementation."""
        cls._search_providers[name] = provider_class
    
    @classmethod
    def register_vector_provider(cls, name: str, provider_class: type):
        """Register a vector provider implementation."""
        cls._vector_providers[name] = provider_class
    
    @classmethod
    def register_ai_provider(cls, name: str, provider_class: type):
        """Register an AI provider implementation."""
        cls._ai_providers[name] = provider_class
    
    @classmethod
    def create_search_provider(cls, provider_name: str) -> SearchProvider:
        """Create search provider instance."""
        if provider_name not in cls._search_providers:
            raise ValueError(f"Unknown search provider: {provider_name}")
        return cls._search_providers[provider_name]()
    
    @classmethod
    def create_vector_provider(cls, provider_name: str) -> VectorProvider:
        """Create vector provider instance."""
        if provider_name not in cls._vector_providers:
            raise ValueError(f"Unknown vector provider: {provider_name}")
        return cls._vector_providers[provider_name]()
    
    @classmethod
    def create_ai_provider(cls, provider_name: str) -> AIProvider:
        """Create AI provider instance."""
        if provider_name not in cls._ai_providers:
            raise ValueError(f"Unknown AI provider: {provider_name}")
        return cls._ai_providers[provider_name]()


# Provider registry decorators
def register_search_provider(name: str):
    """Decorator to register search provider."""
    def decorator(cls):
        ProviderFactory.register_search_provider(name, cls)
        return cls
    return decorator


def register_vector_provider(name: str):
    """Decorator to register vector provider."""
    def decorator(cls):
        ProviderFactory.register_vector_provider(name, cls)
        return cls
    return decorator


def register_ai_provider(name: str):
    """Decorator to register AI provider."""
    def decorator(cls):
        ProviderFactory.register_ai_provider(name, cls)
        return cls
    return decorator