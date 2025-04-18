# ─── 1. BUILD STAGE ───────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma
COPY src    ./src

RUN npx prisma generate


# ─── 2. RUNTIME STAGE ─────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src         ./src
COPY --from=builder /app/prisma      ./prisma
COPY --from=builder /app/package*.json ./

EXPOSE 3000
CMD ["npm", "run", "start"]
