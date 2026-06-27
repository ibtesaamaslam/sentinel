FROM node:22-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

# ─── Build Stage ────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./
COPY turbo.json tsconfig.base.json ./
COPY .prettierrc ./

COPY packages/core/package.json packages/core/
COPY packages/plugin-sdk/package.json packages/plugin-sdk/
COPY packages/scanner/package.json packages/scanner/
COPY packages/reports/package.json packages/reports/
COPY packages/monitor/package.json packages/monitor/
COPY packages/guardian/package.json packages/guardian/
COPY packages/firewall/package.json packages/firewall/
COPY packages/recovery/package.json packages/recovery/
COPY packages/cli/package.json packages/cli/

RUN pnpm install --frozen-lockfile

COPY packages/core/src packages/core/src
COPY packages/plugin-sdk/src packages/plugin-sdk/src
COPY packages/scanner/src packages/scanner/src
COPY packages/reports/src packages/reports/src
COPY packages/monitor/src packages/monitor/src
COPY packages/guardian/src packages/guardian/src
COPY packages/firewall/src packages/firewall/src
COPY packages/recovery/src packages/recovery/src
COPY packages/cli/src packages/cli/src

RUN pnpm build

# ─── Runtime Stage ──────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

COPY --from=builder /app/packages/cli/dist /app/packages/cli/dist
COPY --from=builder /app/packages/core/dist /app/packages/core/dist
COPY --from=builder /app/packages/plugin-sdk/dist /app/packages/plugin-sdk/dist
COPY --from=builder /app/packages/scanner/dist /app/packages/scanner/dist
COPY --from=builder /app/packages/reports/dist /app/packages/reports/dist
COPY --from=builder /app/packages/monitor/dist /app/packages/monitor/dist
COPY --from=builder /app/packages/guardian/dist /app/packages/guardian/dist
COPY --from=builder /app/packages/firewall/dist /app/packages/firewall/dist
COPY --from=builder /app/packages/recovery/dist /app/packages/recovery/dist
COPY --from=builder /app/packages/cli/package.json /app/packages/cli/

RUN ln -s /app/packages/cli/dist/index.js /usr/local/bin/sentinel

ENTRYPOINT ["sentinel"]
CMD ["--help"]
