FROM node AS builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx

COPY --from=builder /app/build /usr/share/nginx/html

COPY ./src/nginx/nginx.conf /etc/nginx/nginx.conf.d/default.conf:ro

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]