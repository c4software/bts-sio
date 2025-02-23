# Build stage
FROM oven/bun:latest AS build
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run docs:build

# Production stage
FROM nginx:alpine
COPY --from=build /app/.vitepress/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]