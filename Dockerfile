# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Copy the environment variables
COPY .env .env

# Expose the port that the app will run on
EXPOSE 8000

# Define the command to run the app
CMD ["node", "server.js"]
