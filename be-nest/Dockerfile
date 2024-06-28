FROM node:17-alpine3.14
WORKDIR /app
COPY package*.json ./
RUN npm install --only-prod
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]