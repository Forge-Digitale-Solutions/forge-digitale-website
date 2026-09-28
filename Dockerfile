# Forge Digitale Solutions — Node server for Dokploy.
# Build-arg NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is inlined by Next at image build.
# Runtime env (Dokploy → Environment, not build args):
#   DATABASE_URI, PAYLOAD_SECRET, PAYLOAD_PUBLIC_SERVER_URL
# Mount a volume on /app/media for article images.
# Listens on 3000. Swarm healthcheck: curl -f http://127.0.0.1:3000/

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
ENV NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=$NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build && npm prune --omit=dev

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
RUN apk add --no-cache curl \
  && addgroup -g 1001 -S nodejs \
  && adduser -S -u 1001 -G nodejs nextjs \
  && mkdir -p /app/media \
  && chown nextjs:nodejs /app/media

COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=build --chown=nextjs:nodejs /app/next.config.ts ./next.config.ts
COPY --from=build --chown=nextjs:nodejs /app/tsconfig.json ./tsconfig.json
COPY --from=build --chown=nextjs:nodejs /app/src ./src
COPY --from=build --chown=nextjs:nodejs /app/scripts/import-posts.ts ./scripts/import-posts.ts
COPY --from=build --chown=nextjs:nodejs /app/scripts/clear-dev-push-marker.mjs ./scripts/clear-dev-push-marker.mjs
COPY --from=build --chown=nextjs:nodejs /app/scripts/start-with-migrations.sh ./scripts/start-with-migrations.sh

USER nextjs
EXPOSE 3000
# migrate runs before next listens; allow the first boot to finish DDL.
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD curl -f http://127.0.0.1:3000/ || exit 1
# -H 0.0.0.0: Docker sets HOSTNAME to the container id, which would otherwise
# make `next start` bind only that name and fail the localhost healthcheck.
CMD ["sh", "scripts/start-with-migrations.sh"]
