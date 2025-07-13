FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
COPY vite.config.mjs ./
COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
