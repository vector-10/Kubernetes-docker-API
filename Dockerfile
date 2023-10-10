# specify the base image
FROM node:18-alpine
# Set the working directory
WORKDIR /app
# Copy application files
COPY . .
# TIme to install all the dependencies
RUN npm install
# specify the command to start application
CMD [ "nodemon", "server.js" ]
# expost the application
EXPOSE 3000

