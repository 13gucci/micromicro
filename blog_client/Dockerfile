# Specify base image to build up
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock to working directory
COPY ./package.json ./

# Install dependencies using yarn
RUN npm install

# Copy all files to working directory
COPY . .

# Build the project
RUN yarn build

# Expose the port that the application will run on
EXPOSE 3000

# Default startup command
CMD ["npm", "run", "dev"]