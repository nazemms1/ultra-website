# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:24-slim AS builder

RUN npm install --global corepack@latest
RUN corepack enable
RUN corepack prepare pnpm@latest-11 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml  ./
RUN pnpm i --frozen-lockfile

COPY . .


RUN pnpm build

# ── Stage 2: Runner ─────────────────────────────────────────────────────────
FROM node:24-slim AS runner

WORKDIR /app

COPY --from=builder --chown=node:node /app/package.json         ./
COPY --from=builder --chown=node:node /app/node_modules         ./node_modules
COPY --from=builder --chown=node:node /app/.next                ./.next
COPY --from=builder --chown=node:node /app/public               ./public
COPY --from=builder --chown=node:node /app/next.config.ts       ./

RUN mkdir -p /app/.next/cache/images
RUN chown -R node:node /app/.next/cache

ENV NODE_ENV=production

USER node
EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
