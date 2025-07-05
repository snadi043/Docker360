FROM node:23

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "start" ]

# Explanation for the multi-container communication in integration with docker-networks.

# This project is divided into 3 individual blocks (consider them a 3 individual containers).
# The main purpose to divide or isolate the containers is to improve efficiency and reusability of the container.
# This application is divided as 
    # mongo - (an image created based remote "mongo" image from docker-hub. The container is named as "mongodb" in this project).
    # docker-backend - (an image is build which is customized by ourselves as per the project and image is named as "docker-backend". The container is named as "docker-backend").
    # docker-frontend - (an image is build which is customized by ourselves as per the project and image is named as "docker-frontend". The container is named as "docker-frontend").
# In order to make all these 3 isolated container talking/communicating with each other, we implement the concept of docker networks.
# So, we create a network for this communication to happen which is named "docker-goals-app-network" and it is created with the command "docker network create docker-goals-app-network".
# Once, the network is created, the first isolated container is created and attached to the network with the commands as follows 
    #  "docker run -t mongodb mongo"  -> for creating the container based on remote "mongo" image with "mongodb" as container name.
    #  "docker run -t -d --network docker-goals-app-network --name mongodb mongo" -> adding --network docker-goals-app-network will attach the container to the network.
# Now, adding the backend of the project to the network, which is basically attaching the "docker-backend" container to the network which is named "docker-goals-app-network".
    # "docker build -t docker-backend ."  -> command to create the custom image for docker-backend container.
    # "docker run -p 80:80 -d -t --network docker-goals-app-network --name docker-backend docker-backend"  -> command to create the conatiner named "docker-backend" and attaching it to the network "docker-goals-app-network".
    # To make the successfull connection between the backend and the mongodb databse both the isolated conatiner has to communicate in a network which is achieved by making changes in the backend databse connection string.
    # In this project, it is in backend -> app.js file, where the term "localhost" has to be refactored with container name which is build based on remote "mongo" image and in this project it is named as "mongodb".
        # So, the url will be like "mogodb://mongdb:27017/{project-name-in-database}"
        # "mogodb://host.docker.internal:27017/{project-name-in-database}" -> this is the case if the container is talking with the databse hosted in the local environment rather created from remote image.
        # Also, the flag -p 80:80 should be added to enable the connection with the frontend (especially for the "endpoints" dealing with localhost) communicate with backend apis. 
# Now, Finally, adding the frontend of the project to the network, which is basically attaching the "docker-frontend" container to the network which is named "docker-goals-app-network".
    # "docker build -t docker-frontend ."  -> command to create the custom image for docker-frontend container.
    # "docker run -p 3000:3000 -d -it --network docker-goals-app-network --name docker-frontend docker-frontend"  -> command to create the conatiner named "docker-frontend" and attaching it to the network "docker-goals-app-network".
    # For, the frontend container the flags --it and the port 3000:3000 should be added to avoid the issues with react-projects build and allwoing the "url"s in the frontend which are dealing with "localhost" to enable communication with the backend "apis" exposed on port "80". 
# So, basically --network flag is to make a centralized communication within the network among all the conatiners
#               -p 3000:3000 and  -p 80:80 is to communicate the internals of frontend with the backedn which is (endpoint and api) communication.

# In the same project, to make the data persistent in the container we have to create the container which are enabled with volumes.
# This configuration of containers with volumes helps us to restore the data/state in the application when the container are restarted but not when they are removed.
# So, in this project an extension is made such that a named volume is added to the conatiner creation and the command fot that is as follows
    # "docker run -p 80:80 -d -t --rm -v mongo-named-volume-data:/data/db --network docker-goals-app-network --name docker-backend docker-backend"

# In Addition, it is also important to enable the security in allowing the connections to the database when using th containers.
# This can be implemented by using the environment variables to setup the access using username and password for the database and refactoring the source code accordingly.
# The command to configure the environment variables to the containers is as follows.
    # "docker run -p 80:80 -d -e MONGO_INITDB_ROOT_USERNAME={username} -e MONGO_INITDB_ROOT_PASSWORD={password} -v mongo-named-volume-data:/data/db --network docker-goals-app-network --name docker-backend docker-backend"