FROM node:20-alpine as build

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]