# ---------- Build Stage ----------
FROM node:14-alpine AS build
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci  # faster & safer than npm install for CI/CD

RUN npm install --save-dev @babel/core@^7.16.0
COPY . .
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:alpine

# Remove default config to avoid conflicts
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx config (previously nginx.conf)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React (or other FE) app
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
