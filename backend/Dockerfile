# ============================================
# Stage 1: Build the Go application
# ============================================
FROM golang:1.23-alpine AS builder

# Install build dependencies (gcc needed for CGO, which SQLite requires)
RUN apk add --no-cache gcc musl-dev

# Set working directory for the build
WORKDIR /app

# Copy dependency files first (this layer is cached if dependencies don't change)
COPY go.mod go.sum ./

# Download dependencies (cached separately from source code)
RUN go mod download

# Copy the entire source code
COPY . .

# Build the application with optimizations:
# -o main: output binary named "main"
# -ldflags="-w -s": strip debug info to reduce binary size
# CGO_ENABLED=1: required for SQLite
RUN CGO_ENABLED=1 GOOS=linux go build -ldflags="-w -s" -o main ./cmd/web

# ============================================
# Stage 2: Create minimal runtime image
# ============================================
FROM alpine:3.19

# Install runtime dependencies (SQLite libraries needed at runtime)
RUN apk add --no-cache ca-certificates sqlite-libs

# Create a non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Set working directory
WORKDIR /app

# Copy only the compiled binary from builder stage (NOT the entire Go toolchain)
COPY --from=builder /app/main .

# Create directory for database with proper permissions
RUN mkdir -p /app/pkg/db && \
    chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Set environment variable for database path
ENV DB_PATH=/app/pkg/db/database.db

# Expose port
EXPOSE 8080

# Run the application
CMD ["./main"]