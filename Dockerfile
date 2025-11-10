FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /usr/src/app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package*.json ./

RUN npm install

COPY --chown=appuser:appgroup --from=builder /usr/src/app/dist ./dist

USER appuser

EXPOSE 3000

CMD ["node", "dist/src/main.js"]