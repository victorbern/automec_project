FROM node:16-alpine as build
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --force
COPY --chown=node:node . .
RUN npm run build