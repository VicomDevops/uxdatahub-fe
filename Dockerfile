FROM node:14-alpine AS build
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
RUN npm install --save-dev @babel/core@^7.16.0
COPY . .
RUN npm run build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
