# Use a specific Node.js version that is stable and supported
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including @nestjs/cli globally
RUN npm install --only=production && npm install -g @nestjs/cli

# Copy the rest of the application files
COPY . .

# Build the application
RUN nest build

# Command to run the application
CMD ["npm", "run", "start:prod"]
