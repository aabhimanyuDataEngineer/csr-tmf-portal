# Multi-stage Docker build for AI-Powered Clinical Documentation Portal Frontend
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY public/ ./public/
COPY src/ ./src/
COPY tsconfig.json ./

# Build the application
RUN npm run build

# Production stage with Node.js serve
FROM node:18-alpine as production

# Install serve globally
RUN npm install -g serve

# Create app directory
WORKDIR /app

# Copy built application from build stage
COPY --from=build /app/build ./build

# Create non-root user
RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001 -G appuser && \
    chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the application with serve
CMD ["serve", "-s", "build", "-l", "3000"]