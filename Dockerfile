
FROM node:18-alpine AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR '/app'

COPY package*.json ./
COPY *.js ./

RUN npm install

EXPOSE 3000

COPY . .

######################################Prod############################  
FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR '/app'

COPY ./package*.json ./
COPY ./*.js ./

RUN npm install

EXPOSE 3000
COPY . .

######################################test############################
FROM node:18-alpine as test

ARG NODE_ENV=test
ENV NODE_ENV=${NODE_ENV}
WORKDIR '/app'

COPY package*.json ./
COPY *.js ./

RUN npm install

COPY . .

EXPOSE 5000

