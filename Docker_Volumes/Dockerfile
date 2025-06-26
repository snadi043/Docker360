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
CMD ["npm", "start"]



# As we already know that docker images are the main source for the data which gets locked into the container once an image is build.
# This is the reason why the images are called "read-only" once the snapshot of the code is taken by the docker when an image is build and the changes in the code cannot reflect in the same image.
# The only alternative is to build a new image and create a new snapshot for the new set of changes in the code.
# In addition, let us consider when dealing with an application where there is a requirement to store data in a container, it is a great deal because, when a container is stopped/removed the data is not persistent. 
# In the realtime this process is cumbersome to always rebuild the images and containers for every small change in the code.
#  To overcome this issue, Docker provides us with two main concepts which are "Volumes" and "Bind mounts".
# Although, both these features help us to deal with some of the problems, but both these features are independent by themselves and also have certain drawbacks.

                                                                        # Docker Volumes
# Docker Anonymous Volumes
            # Docker volumes are very useful concept/feature provided by docker which helps the developers to deal with the problem of handling data persistently.
            # This means, through volumes Docker enables a "Read/Write" layer in the "Container" which helps to store the data in this layer and can fetch the data from the container when a container is stopped and restarted.
            # By default these volumes are "anonymous" which means they doesnot have any name.
            # These volumes are enabling by an "INSTRUCTION" in the "Dockerfile" which is written as VOLUME ["/appfolder/appfile"].
            # With this INSTRUCTION docker creates a memory in our localhost machine randomly which the developer doesn't have access to view/edit and obviously it is not good to edit anything there.
            # But, this does not deal with the problem of container removal or deletion. In this case, the data is lost permanently and we dont have access to it.

# Docker Named Volumes
            # The alternative to this problem is "named" volume, where a container is aligned with our local machine and allocates a memory for the volume and stores the changes in it.
            # So, using this process, we can access the volume through the "name" we assigned and rerun the container based on this volume and can use the previous data as it is even after the container is removed.
            # The command to view the volumes in Docker is -> "docker volume ls"
            # The command to delete the anonymous volumes in Docker is -> "docker volume prune" -> deletes all un-named volumes. 
            # The command to delete the named volumes in Docker is. -> "docker volume rm [volume name]"

                                                                        
                                                                        # Docker Bind Mounts
            # The purpose of Docker Bind Mounts is that, using docker volume we can solve the problem of storing the data and reutilizing the data by re-running the container either before deletion or after deletion.
            # But, there is no way where we can edit the data in the source code and without rebuilding an image reflecting the changes in browser.
            # This, problem can be resolved using "Docker Bind Mounts". The purpose of the Bind Mounts is that it acts like a "git repository" in your localhost where the changes in your code is stored in your local machine
            # and gets reflected in the browser when refreshed. The same gets applied to the bind mounts.
            # Bind Mounts are enabled within the terminal same as named volumes. The difference to the named volumes and the bind mounts is that in bind mounts there is no "naming". These are enabled by specifying the relative path
            # in your locahmachine where you want to create these bind mounts.
            # The command is as follows -> docker -v $(pwd):/app 
            # In the above command the $(pwd) -> is similar to the name in the named volumes, but here in bind mounts we have to specify the relative path where the mount has to store.