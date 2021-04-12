# Base image
FROM node:15.12.0-alpine3.12 as build
RUN mkdir /backend
WORKDIR /backend

COPY . /backend

COPY package.json /backend

RUN npm cache verify
RUN npm install
RUN npm install -g pm2

RUN npm run build
CMD ["sh", "-c", "pm2-runtime start ecosystem.config.js --env production"]
