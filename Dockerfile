FROM node:18.10.0 AS builder

ENV SELF_SIGNED_CERT_IN_CHAIN=true
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false
RUN yarn config set strict-ssl false

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml /app/
RUN pnpm install

COPY . .
RUN pnpm build


FROM nginx:1.23.1
COPY _nginx/default.template /etc/nginx/conf.d/default.template
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
COPY scripts/run.sh /scripts/scripts.sh
ENV BACKEND_URL http://127.0.0.1:8443
RUN ["chmod", "+x", "/scripts/scripts.sh"]
ENTRYPOINT ["/scripts/scripts.sh"]
