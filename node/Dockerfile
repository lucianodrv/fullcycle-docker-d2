FROM node:alpine3.18

WORKDIR /usr/app

COPY . /usr/app

RUN npm install

EXPOSE 3000

CMD [ "node", "app.js" ]