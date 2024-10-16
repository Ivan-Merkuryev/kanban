FROM node:20-alpine as build
WORKDIR /kanban-front-end
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /app
# COPY --from=build /dist /usr/share/nginx/html
# COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
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