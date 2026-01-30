FROM node:20-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /src

# Copy only package files first for caching
COPY Backend/package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the project
COPY Backend/ ./

# Expose backend port
EXPOSE 3000

# Environment vars for file watcher in Docker
ENV CHOKIDAR_USEPOLLING=true

# Default command for dev
CMD ["npm", "run", "dev"]