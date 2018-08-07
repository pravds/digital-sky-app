FROM node:8.11.2 as build-deps

RUN apt-get update && apt-get install -y vim

RUN mkdir -p /node/.npm-global

ENV PATH=/node/.npm-global/bin:$PATH

ENV NPM_CONFIG_PREFIX=/node/.npm-global

RUN npm install -g yarn

WORKDIR ./app

COPY package.json yarn.lock ./app

RUN yarn

COPY ../public ./app/

COPY ../src ./app/

RUN yarn build

FROM nginx:1.12-alpine

COPY --from=build-deps ./app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]