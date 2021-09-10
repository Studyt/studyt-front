FROM node:alpine as deps

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM node:alpine as builder

WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

FROM node:alpine as runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["npm", "start"]