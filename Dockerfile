# ----------------------------
# 1️⃣ BUILD STAGE
# ----------------------------
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the NestJS project
RUN npm run build

# ----------------------------
# 2️⃣ RUN STAGE (Smaller Image)
# ----------------------------
FROM node:22-alpine AS runner

WORKDIR /usr/src/app

# Copy only necessary files from build stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# Install only production dependencies
RUN npm ci --omit=dev

# Expose the app port (default 3000)
EXPOSE 3000

# Load environment variables if needed
ENV NODE_ENV=production

# Start the NestJS app
CMD ["node", "dist/main"]
