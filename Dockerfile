FROM node:20-alpine AS build

WORKDIR /app/src

COPY . ./
RUN npm install && npm run build

FROM node:20-alpine

EXPOSE 4000
WORKDIR /usr/app

COPY --from=build /app/src/dist/pgb-web ./

CMD ["node", "server/server.mjs"]
