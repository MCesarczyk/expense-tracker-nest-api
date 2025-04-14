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

CMD [ "pnpm", "dev" ]

###################
# BUILD FOR PRODUCTION
###################

FROM node:23.11.0-bullseye-slim AS build

# RUN apt-get update \
#   && apt-get -y install postgresql-client-common \
#   && rm -rf /var/lib/apt/lists/*

RUN npm install -g npm && npm install --g pnpm

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# RUN npx prisma migrate dev
# RUN npx prisma generate

RUN pnpm build

ENV NODE_ENV=production

RUN pnpm install --prod

USER node

###################
# PRODUCTION
###################

FROM node:23.11.0-alpine3.21 AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

COPY --chown=node:node wait-for-db.sh ./wait-for-db.sh

RUN chmod +x ./wait-for-db.sh

CMD [ "node", "dist/main.js" ]
# CMD ["./wait-for-db.sh", "expense-tracker-db", "node", "dist/main.js"]
