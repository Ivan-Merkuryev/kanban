FROM node:20-alpine as build

WORKDIR /kanban-back-end

COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

COPY . .
COPY .env .env

ENV NODE_ENV=production
ENV JWT_SECRET=${JWT_SECRET}
ENV DATABASE_URL=${DATABASE_URL}

RUN npm run build
CMD ["npm", "run", "build"]
