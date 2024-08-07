# Use Node.js 18-alpine as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including @nestjs/cli globally
RUN npm install --only=production && npm install -g @nestjs/cli

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the application port (if applicable, specify the correct port)
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]
