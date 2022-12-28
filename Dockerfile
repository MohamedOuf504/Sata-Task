
FROM node:18.12.0 AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR '/app'

COPY package*.json ./
COPY *.js ./

RUN npm install

EXPOSE 3000

COPY . .




######################################Prod############################  
FROM node:18.12.0 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR '/app'

COPY ./package*.json ./
COPY ./*.js ./

RUN npm install

EXPOSE 3000
COPY . .

