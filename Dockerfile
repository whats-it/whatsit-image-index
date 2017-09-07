#FROM alpine-node:3.4
FROM node:6-alpine

LABEL authors="kyewon <k@bluehack.net>"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk add --update nodejs python bash

COPY package.json /usr/src/app/
RUN npm install
#RUN npm install mocha mochawesome -g

ENV PATH /usr/src/app/bin:$PATH

COPY . /usr/src/app

EXPOSE 6379


CMD [ "npm", "start" ]
