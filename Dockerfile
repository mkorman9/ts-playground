FROM node:18

RUN addgroup --system --gid=9999 app && \
    adduser --system --uid=9999 --gid=9999 --home /app --disabled-password app

COPY --chown=app:app dist/ /app/dist/
COPY --chown=app:app templates/ /app/templates/
COPY --chown=app:app package.json /app
COPY --chown=app:app package-lock.json /app

USER app
WORKDIR /app

RUN npm ci --omit=dev

CMD [ "npm", "run", "exec" ]
