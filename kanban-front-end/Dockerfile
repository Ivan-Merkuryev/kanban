FROM node:20-alpine as build
WORKDIR /kanban-front-end
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /kanban-front-end/public /usr/share/nginx/html
COPY --from=build /kanban-front-end/.next /usr/share/nginx/html/.next
EXPOSE 3000
HEALTHCHECK --interval=5s --timeout=3s --start-period=10s --retries=3 CMD curl --fail http://localhost:3000
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