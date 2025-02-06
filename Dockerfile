FROM node:20.17.0 AS builder

ENV SELF_SIGNED_CERT_IN_CHAIN=true
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false
RUN yarn config set strict-ssl false
RUN npm install -g pnpm && pnpm config set strict-ssl false

# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories && \
#     apk update && \
#     apk upgrade && \
#     apk add --no-cache ca-certificates && \
#     apk add --no-cache libc6-compat && \
#     curl -fsSL "https://ghproxy.com/https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY . .
RUN pnpm build


FROM nginx:1.27.4
COPY _nginx/default.template /etc/nginx/conf.d/default.template
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
COPY scripts/run.sh /scripts/scripts.sh
ENV BACKEND_URL http://127.0.0.1:8443
RUN ["chmod", "+x", "/scripts/scripts.sh"]
ENTRYPOINT ["/scripts/scripts.sh"]
