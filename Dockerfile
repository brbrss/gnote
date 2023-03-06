FROM node:18-alpine

WORKDIR /usr/src/app/

COPY . .
COPY ./back/docker.env ./back/.env

WORKDIR /usr/src/app/back/

CMD node ./bin/www