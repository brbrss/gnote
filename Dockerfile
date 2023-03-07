FROM node:18-alpine AS buildfront


WORKDIR /usr/src/app/
COPY ./front/package.json ./front/
WORKDIR /usr/src/app/front/
RUN npm install
WORKDIR /usr/src/app/
COPY . .
WORKDIR /usr/src/app/front/
RUN npm run build


FROM node:18-alpine AS runback

WORKDIR /usr/src/app/
COPY ./back ./back
COPY ./back/docker.env ./back/.env
COPY --from=buildfront /usr/src/app/front/public/index.html ./back/public
COPY --from=buildfront /usr/src/app/front/dist/bundle.js ./back/public/dist/

WORKDIR /usr/src/app/back/
CMD node ./bin/www
