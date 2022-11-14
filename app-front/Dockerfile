FROM node:13-alpine as build
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --force
RUN npm install react-scripts@3.0.1 -g
COPY --chown=node:node . .
RUN npm run build
# production environment
# FROM nginx:1.16.0-alpine
# COPY --from=build /app/front/build /usr/share/nginx/html
# EXPOSE 80
# CMD [“nginx”, “-g”, “daemon off;”]