FROM node:18-alpine

WORKDIR /app
EXPOSE 8080

COPY ./RESTbasic/package*.json ./
RUN npm install

COPY ./RESTbasic/ ./

CMD ["/bin/sh", "-c", "npm run initDb && npm start"]
