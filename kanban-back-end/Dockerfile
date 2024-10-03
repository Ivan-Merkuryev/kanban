FROM node:20-alpine

COPY package.json package.json
RUN npm install

COPY . .
COPY .env .env

ENV NODE_ENV=production
ENV JWT_SECRET=${JWT_SECRET}
ENV DATABASE_URL=${DATABASE_URL}

CMD ["npm", "run", "start:prod"]