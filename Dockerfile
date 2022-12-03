# Stage 1 - the build process
FROM node:16.17.1-alpine3.16 AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn run build

# Stage 2 - the production environment
FROM nginx:1.23.1-alpine
# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf.d /etc/nginx
# Static build
COPY --from=builder /usr/src/app/build /usr/share/nginx/html 

# Default port exposure
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]