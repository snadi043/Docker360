FROM node:23

WORKDIR /app

COPY pacakge.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]