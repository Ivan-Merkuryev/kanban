FROM node:20-alpine as build
WORKDIR /kanban-front-end
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

COPY . .
RUN npm run build

FROM node:20-alpine
# COPY --from=build /dist /usr/share/nginx/html
# COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /next.config.mjs ./next.config.mjs
COPY --from=build /public ./public
COPY --from=build /.next ./.next
COPY --from=build /node_modules ./node_modules
COPY --from=build /package.json ./package.json

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"] 

# WORKDIR /kanban-front-end

# COPY package.json package-lock.json ./
# RUN npm ci --frozen-lockfile
# COPY --from=dependencies /kanban-front-end/node_modules ./node_modules
# COPY . .

# RUN npm run build

# FROM nginx:stable-alpine 

# # COPY --from=build /dist /usr/share/nginx/html

# COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 3000
# 