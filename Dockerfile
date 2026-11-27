
FROM node:22-alpine

WORKDIR /app

# Enable pnpm through Corepack
RUN corepack enable

# Install Bun prerequisites and Bun
RUN apk add --no-cache bash curl unzip \
    && curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:${PATH}"

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
