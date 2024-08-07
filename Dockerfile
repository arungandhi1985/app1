# Dockerfile
FROM node:16

WORKDIR /app1

COPY package*.json ./

RUN npm install

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]



