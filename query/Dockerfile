# Specify base image to build up
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json to working directory
COPY ./package.json ./

# Install all deps
RUN npm install

# Copy all files to working directory
COPY ./ ./ 

# Default startup command
CMD ["npm", "start"]