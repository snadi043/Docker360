# This is the simple dockerfile for this project which is important to build the image and then create a container on the image.

# Sourcing the node image from the dockerhub 
FROM node:14-alpine

# Creating the working directory for the application to then create and store files.
WORKDIR /app

# Copying the package.json files once to the root directory of the application before npm install to optimize the flow.
COPY package.json .

# Running the install command with npm to install all the dependencies of the project based on package.json file.
RUN npm install

# Once, installed all the package the changes are again copied to the root directory to keep the updates in sync.
COPY . .

# Exposing the port to communicate with the server.
EXPOSE 80

# Command to spin the server which then build the file app.js and loads the application.
CMD [ "node", "app.js" ]
