# NODE VERSION
FROM node:14.20.0-alpine AS builder
COPY . ./rest-api-ui
WORKDIR /rest-api-ui
RUN yarn install
RUN yarn build
# NGINX VESION
FROM nginx:1.19-alpine
COPY --from=builder /rest-api-ui/build /usr/share/nginx/html
COPY --from=builder /rest-api-ui/nginx.conf /etc/nginx/conf.d/default.conf
