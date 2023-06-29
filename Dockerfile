FROM node:18 AS builder

COPY . .
RUN npm ci && npm run build

FROM node:18

RUN addgroup --system --gid=9999 app && \
    adduser --system --uid=9999 --gid=9999 --home /app --disabled-password app

COPY --chown=app:app --from=builder dist/ /app/dist/
COPY --chown=app:app --from=builder templates/ /app/templates/
COPY --chown=app:app --from=builder package.json /app
COPY --chown=app:app --from=builder package-lock.json /app

USER app
WORKDIR /app

RUN npm ci --omit=dev

CMD [ "npm", "run", "exec" ]
