# specify the base image
FROM node:20-alpine
# Set the working directory
WORKDIR /app
# Copy application files
COPY package*.json ./
# TIme to install all the dependencies
RUN npm install
# Copy application files
COPY . .
# expost the application
EXPOSE 4000
# specify the command to start application
CMD npm start
