FROM node:17-alpine3.14
WORKDIR /app
COPY package.json .
RUN npm install --only-prod
COPY . .

CMD ["npm","start"]