FROM node:alpine

WORKDIR /app
# Copy package.json to the current directory
COPY package.json ./  
# Install dependencies
RUN npm install  
# Copy all files to the current directory

COPY ./ ./ 
# Start the application
CMD ["npm", "start"]   