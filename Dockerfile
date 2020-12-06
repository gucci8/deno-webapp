FROM hayd/alpine-deno:latest

EXPOSE 7777

WORKDIR /app

COPY app.js .

CMD [ "run", "--unstable", "--watch", "--allow-net", "--allow-env", "--allow-read", "app.js" ]