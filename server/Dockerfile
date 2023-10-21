# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./.env

# Install dependencies
RUN npm install --production

# Copy the rest of the application source code to the container
COPY . .

RUN npx prisma generate

# Expose the port on which your Node.js application runs (change this if needed)
EXPOSE 8080

# Command to start the Node.js application
CMD ["npm", "start"]
