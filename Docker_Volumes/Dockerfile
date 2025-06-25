# STEP: 1 -> Import the base images from dockerhub as per the application requirements.
FROM node:23

# STEP:2 -> Create the working directory for the project 
WORKDIR /app

# STEP:3 -> Copy the pacakage.json file of the application.
COPY package.json .

# STEP:4 -> Run the installation command for the dependencies before creating the copy of thr files for optimization. 
RUN npm install

# STEP:5 -> Copy the files from the source to the destination repositories
COPY . .

# STEP: 6 -> Expose the application to run on a port
EXPOSE 80

#STEP: 7 -> Enable the command to run the application
CMD ["node", "server.js"]