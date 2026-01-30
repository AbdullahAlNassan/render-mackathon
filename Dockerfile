FROM node:20-alpine AS deps
WORKDIR /app

# Install deps (keep Docker layer cache stable)
COPY Backend/package*.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY Backend/ ./

# Build TypeScript -> dist
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production

# Copy runtime essentials
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

# Prisma schema + migrations (needed for migrate deploy)
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3000

# Render sets PORT; our app reads it from env.
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]


