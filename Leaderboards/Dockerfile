FROM node:lts
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY . .
RUN npm run build
RUN rm -rf .gitignore node_modules/ public/ src/

EXPOSE 5000
ENTRYPOINT [ "npx", "serve", "build" ]