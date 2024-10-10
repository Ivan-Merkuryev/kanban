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



# FROM node:20-alpine As development

# WORKDIR /kanban-back-end

# COPY package*.json ./

# RUN npm install --only=development

# COPY . .

# RUN npm run build

# FROM node:20-alpine as build

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /kanban-back-end

# COPY package*.json ./

# RUN npm install --only=production

# COPY . .

# COPY --from=development /kanban-back-end/dist ./dist
# CMD ["npm", "run", "build"]
# CMD ["node", "dist/main"]