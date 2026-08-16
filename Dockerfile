# Static Next.js site for Dokploy (nginx).
# Build args (set in Dokploy → Environment / Build args):
#   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
#   GOOGLE_PLACES_API_KEY (optional — fallback avis statiques sinon)

FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
ARG GOOGLE_PLACES_API_KEY
ENV NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=$NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
ENV GOOGLE_PLACES_API_KEY=$GOOGLE_PLACES_API_KEY

RUN npm run build

FROM nginx:1.27-alpine AS runner
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
