# ---------- Stage 1: Build Frontend ----------
FROM node:18 AS client-builder
WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build


# ---------- Stage 2: Build Backend ----------
FROM node:18 AS server
WORKDIR /app

ENV NODE_ENV=production

# Install backend deps
COPY server/package*.json ./
RUN npm ci --only=production

# Copy backend code
COPY server/ ./

# Clean old public files
RUN rm -rf ./public/*

# Copy frontend build
COPY --from=client-builder /app/client/dist ./public

EXPOSE 3000

CMD ["node", "index.js"]