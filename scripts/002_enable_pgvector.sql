-- Enable pgvector extension for vector embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Now update the knowledge_nodes table to use vector type
-- The previous script will fail without this extension
