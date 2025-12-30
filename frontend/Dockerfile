# ============================================
# Stage 1: Build the React application
# ============================================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files (cached if dependencies unchanged)
COPY package*.json ./

# Install ALL dependencies (including devDependencies needed for build)
# --no-optional: skip optional deps to speed up install
# --frozen-lockfile: ensure exact versions from package-lock.json
RUN npm ci --no-optional --frozen-lockfile

# Copy source code
COPY . .

# Build optimized production bundle
# Creates /app/build directory with static files
RUN npm run build

# ============================================
# Stage 2: Serve with lightweight web server
# ============================================
FROM node:20-alpine

# Install serve (lightweight static file server, better than nginx for simple cases)
RUN npm install -g serve

# Create non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Set working directory
WORKDIR /app

# Copy only the production build from builder (NOT node_modules or source)
COPY --from=builder /app/build ./build

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Serve the static files
# -s: single-page app mode (routes /* to index.html)
# -l 3000: listen on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]