# Build the Vite SPA, then serve the static dist/ with a rootless nginx.
# ZAD requires a rootless image listening on a port > 1024 (here: 8080).

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci
COPY . .
RUN npm run build

# nginx-unprivileged runs as non-root (uid 101) and listens on 8080 by default.
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
