FROM node:20-alpine

COPY package.json package.json
RUN npm install

COPY . .

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]