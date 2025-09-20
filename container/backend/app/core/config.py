"""
Core configuration management for the AI-Powered Clinical Documentation Portal.
Supports multiple deployment environments and configurable AI/ML and search providers.
"""

from typing import Optional, Literal, Dict, Any
from pydantic import BaseSettings, Field, validator
from functools import lru_cache
import os


class BedrockConfig(BaseSettings):
    """AWS Bedrock configuration settings."""
    region: str = Field(default="us-east-1", env="BEDROCK_REGION")
    claude_model_id: str = Field(default="anthropic.claude-3-sonnet-20240229-v1:0", env="BEDROCK_CLAUDE_MODEL")
    titan_model_id: str = Field(default="amazon.titan-text-express-v1", env="BEDROCK_TITAN_MODEL")
    max_tokens: int = Field(default=4000, env="BEDROCK_MAX_TOKENS")
    temperature: float = Field(default=0.1, env="BEDROCK_TEMPERATURE")


class DatabricksConfig(BaseSettings):
    """Databricks ML configuration settings."""
    workspace_url: str = Field(..., env="DATABRICKS_WORKSPACE_URL")
    token: str = Field(..., env="DATABRICKS_TOKEN")
    cluster_id: str = Field(..., env="DATABRICKS_CLUSTER_ID")
    model_serving_endpoint: str = Field(..., env="DATABRICKS_MODEL_ENDPOINT")
    vector_search_endpoint: str = Field(..., env="DATABRICKS_VECTOR_ENDPOINT")


class OpenSearchConfig(BaseSettings):
    """AWS OpenSearch configuration settings."""
    endpoint: str = Field(..., env="OPENSEARCH_ENDPOINT")
    region: str = Field(default="us-east-1", env="OPENSEARCH_REGION")
    index_name: str = Field(default="clinical-documents", env="OPENSEARCH_INDEX")
    use_ssl: bool = Field(default=True, env="OPENSEARCH_USE_SSL")
    verify_certs: bool = Field(default=True, env="OPENSEARCH_VERIFY_CERTS")


class S3Config(BaseSettings):
    """AWS S3 configuration settings."""
    bucket_name: str = Field(..., env="S3_BUCKET_NAME")
    region: str = Field(default="us-east-1", env="S3_REGION")
    csr_prefix: str = Field(default="csr/", env="S3_CSR_PREFIX")
    tmf_prefix: str = Field(default="tmf/", env="S3_TMF_PREFIX")
    processed_prefix: str = Field(default="processed/", env="S3_PROCESSED_PREFIX")


class DeltaConfig(BaseSettings):
    """Delta Lake configuration settings."""
    catalog_name: str = Field(default="clinical_portal", env="DELTA_CATALOG")
    schema_name: str = Field(default="main", env="DELTA_SCHEMA")
    documents_table: str = Field(default="documents", env="DELTA_DOCUMENTS_TABLE")
    chunks_table: str = Field(default="document_chunks", env="DELTA_CHUNKS_TABLE")
    audit_table: str = Field(default="audit_log", env="DELTA_AUDIT_TABLE")


class RedisConfig(BaseSettings):
    """Redis cache configuration settings."""
    host: str = Field(default="localhost", env="REDIS_HOST")
    port: int = Field(default=6379, env="REDIS_PORT")
    db: int = Field(default=0, env="REDIS_DB")
    password: Optional[str] = Field(default=None, env="REDIS_PASSWORD")
    ttl_seconds: int = Field(default=3600, env="REDIS_TTL_SECONDS")


class SecurityConfig(BaseSettings):
    """Security and authentication configuration."""
    secret_key: str = Field(..., env="SECRET_KEY")
    algorithm: str = Field(default="HS256", env="JWT_ALGORITHM")
    access_token_expire_minutes: int = Field(default=30, env="ACCESS_TOKEN_EXPIRE_MINUTES")
    refresh_token_expire_days: int = Field(default=7, env="REFRESH_TOKEN_EXPIRE_DAYS")
    
    # CORS settings
    cors_origins: list = Field(default=["http://localhost:3000"], env="CORS_ORIGINS")
    cors_allow_credentials: bool = Field(default=True, env="CORS_ALLOW_CREDENTIALS")


class SystemConfig(BaseSettings):
    """Main system configuration with provider selection."""
    
    # Environment settings
    environment: Literal["development", "staging", "production"] = Field(
        default="development", env="ENVIRONMENT"
    )
    debug: bool = Field(default=False, env="DEBUG")
    log_level: str = Field(default="INFO", env="LOG_LEVEL")
    
    # Provider selection
    ai_provider: Literal["bedrock", "databricks"] = Field(default="bedrock", env="AI_PROVIDER")
    search_provider: Literal["opensearch", "databricks_vector"] = Field(
        default="opensearch", env="SEARCH_PROVIDER"
    )
    vector_provider: Literal["opensearch", "databricks_vector"] = Field(
        default="opensearch", env="VECTOR_PROVIDER"
    )
    
    # API settings
    api_v1_prefix: str = Field(default="/api/v1", env="API_V1_PREFIX")
    max_request_size: int = Field(default=50 * 1024 * 1024, env="MAX_REQUEST_SIZE")  # 50MB
    rate_limit_per_minute: int = Field(default=100, env="RATE_LIMIT_PER_MINUTE")
    
    # Performance settings
    search_timeout_seconds: int = Field(default=30, env="SEARCH_TIMEOUT_SECONDS")
    ai_timeout_seconds: int = Field(default=60, env="AI_TIMEOUT_SECONDS")
    document_cache_ttl: int = Field(default=3600, env="DOCUMENT_CACHE_TTL")
    
    # Compliance settings
    audit_retention_days: int = Field(default=2555, env="AUDIT_RETENTION_DAYS")  # 7 years
    enable_data_masking: bool = Field(default=True, env="ENABLE_DATA_MASKING")
    require_mfa: bool = Field(default=True, env="REQUIRE_MFA")
    
    # Provider-specific configurations
    bedrock: Optional[BedrockConfig] = None
    databricks: Optional[DatabricksConfig] = None
    opensearch: Optional[OpenSearchConfig] = None
    s3: S3Config = Field(default_factory=S3Config)
    delta: DeltaConfig = Field(default_factory=DeltaConfig)
    redis: RedisConfig = Field(default_factory=RedisConfig)
    security: SecurityConfig = Field(default_factory=SecurityConfig)
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False
    
    @validator("bedrock", pre=True, always=True)
    def validate_bedrock_config(cls, v, values):
        """Initialize Bedrock config if AI provider is bedrock."""
        if values.get("ai_provider") == "bedrock":
            return BedrockConfig() if v is None else v
        return v
    
    @validator("databricks", pre=True, always=True)
    def validate_databricks_config(cls, v, values):
        """Initialize Databricks config if provider is databricks."""
        ai_provider = values.get("ai_provider")
        search_provider = values.get("search_provider")
        vector_provider = values.get("vector_provider")
        
        if ai_provider == "databricks" or search_provider == "databricks_vector" or vector_provider == "databricks_vector":
            return DatabricksConfig() if v is None else v
        return v
    
    @validator("opensearch", pre=True, always=True)
    def validate_opensearch_config(cls, v, values):
        """Initialize OpenSearch config if provider is opensearch."""
        search_provider = values.get("search_provider")
        vector_provider = values.get("vector_provider")
        
        if search_provider == "opensearch" or vector_provider == "opensearch":
            return OpenSearchConfig() if v is None else v
        return v
    
    def get_provider_config(self, provider_type: str) -> Optional[Dict[str, Any]]:
        """Get configuration for a specific provider type."""
        provider_map = {
            "bedrock": self.bedrock,
            "databricks": self.databricks,
            "opensearch": self.opensearch,
            "s3": self.s3,
            "delta": self.delta,
            "redis": self.redis,
            "security": self.security
        }
        
        config = provider_map.get(provider_type)
        return config.dict() if config else None


@lru_cache()
def get_settings() -> SystemConfig:
    """Get cached system configuration."""
    return SystemConfig()


# Global settings instance
settings = get_settings()