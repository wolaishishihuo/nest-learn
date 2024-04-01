FROM node:18-alpine3.14 as build-stage

WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

COPY package.json .

# 使用pnpm安装依赖
RUN pnpm install

COPY . .

RUN pnpm run build

# production stage
FROM node:18-alpine3.14 as production-stage

# 安装pnpm（在生产阶段可能也需要，取决于您的应用结构）
RUN npm install -g pnpm

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json
COPY --from=build-stage /app/pnpm-lock.yaml /app/pnpm-lock.yaml

WORKDIR /app

# 在生产阶段安装生产依赖
RUN pnpm install --prod

EXPOSE 3000

CMD ["node", "/app/main.js"]