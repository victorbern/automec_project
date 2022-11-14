FROM node:latest
RUN mkdir -p /home/node/auth/node_modules && chown -R node:node /home/node/auth
WORKDIR /home/node/auth
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 3030
CMD [ "node", "./index.js" ]