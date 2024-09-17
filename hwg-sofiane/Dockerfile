FROM node:lts-alpine as builder
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default
COPY --from=builder /app/dist /usr/share/nginx/html