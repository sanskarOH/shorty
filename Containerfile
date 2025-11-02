# ---------- Stage 1: Build Frontend ----------
FROM node:18 AS client-builder
WORKDIR /app/client

# Install and build client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build


# ---------- Stage 2: Build Backend ----------
FROM node:18 AS server
WORKDIR /app

# Copy server files and install dependencies
COPY server/package*.json ./
RUN npm install
COPY server/ ./

# Clean old build (if any)
RUN rm -rf ./public/*

# Copy the new client build into backend's public folder
COPY --from=client-builder /app/client/dist ./public

# Optional: include .env
COPY server/.env .env

EXPOSE 3000
CMD ["node", "index.js"]
