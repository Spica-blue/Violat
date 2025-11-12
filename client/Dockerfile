FROM node:18-alpine AS build
WORKDIR /app

# install deps
COPY client/package*.json ./
RUN npm ci --silent

# build
COPY client/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY client/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
