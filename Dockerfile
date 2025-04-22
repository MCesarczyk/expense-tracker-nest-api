###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:23.11.0-bullseye-slim AS development
RUN npm install -g npm && npm install --g pnpm

WORKDIR /usr/src/app

ARG PORT
ARG DATABASE_URL
ARG JWT_SECRET

ENV PORT=$PORT
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET

COPY --chown=node:node pnpm-lock.yaml ./

RUN pnpm fetch --prod

COPY --chown=node:node . .

RUN pnpm install
RUN pnpm rebuild bcrypt

RUN chown -R node.node /usr/src/app

USER node

COPY --chown=node:node startup.sh ./startup.sh

RUN chmod +x ./startup.sh

CMD ["./startup.sh", "pnpm", "run", "dev"]

###################
# BUILD FOR PRODUCTION
###################

FROM node:23.11.0-bullseye-slim AS builder
RUN npm install -g npm && npm install --g pnpm

WORKDIR /usr/src/app

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN pnpm build

ENV NODE_ENV=production
RUN pnpm install --offline --prod

USER node

###################
# PRODUCTION
###################

FROM node:23.11.0-alpine3.21 AS production

COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

COPY --chown=node:node startup-prod.sh ./startup-prod.sh

RUN chmod +x ./startup-prod.sh

CMD [ "node", "dist/main.js" ]
