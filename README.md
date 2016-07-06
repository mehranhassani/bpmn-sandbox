# Dockerized microservices 
Application consists of multiple microservices which are programmed, launched and running separately.  
All microservices implements and provides REST services defined by Swagger.

## Microservices
1. Java
2. PHP
3. Phyton
4. Node.js

## Install Docker
* Go to website and download Docker: [https://www.docker.com/](https://www.docker.com/)
* Install Docker as described in documentation: [https://docs.docker.com/](https://docs.docker.com/)

**Check your Docker machine:**  
_$ docker-machine ls_

**If Docker machine does not exists, create new one:**  
docker-machine create --driver virtualbox default


## Build and launch docker images
Docker images can be activated separately or together.  
Docker images activation is described in docker-compose.yml

**Launch all dockers with one command:**  
Go to the folder /org.unctad.docker folder and run command:  
_$ docker-compose up -d_

**Check what processes are running:**  
_$ docker ps_  
Now you should see 4 running processes.
If you are using Linux on your machine, just call http://localhost:[port]/[rest service].  
While using windows then docker machine ip is not shared automatically.
Try to find your docker machine ip by calling command _$ docker-machine env_.  

**Current REST services:**
* Java: http://192.168.99.100:8080/javarest/rest/hello/John
* Python: http://192.168.99.100:5000/v2016/06/hello/John
* PHP: http://192.168.99.100/hello/John
* NodeJs: http://192.168.99.100:49160/v2016/06/hello/John

**Deactivate dockers:**  
_$ docker-compose down_

## Monitoring
cAdvisor tool is used for monitoring.  
Prometheus is used for metrics. You can define your own metrics.

**Installing:**  
_$ docker-compose -f docker-monitoring-compose.yml up -d_

**Monitoring endpoint:**  
http://192.168.99.100:8181/containers

**Metrics endpoint:**  
http://192.168.99.100:9090/graph

## General Docker commands
**List Docker networks:**  
_$ docker network ls_

**List Docker images:**  
_$ docker images_

**Remove Docker image:**  
_$ docker rmi [imageId]_

**List Docker processes:**   
_$ docker ps_

**Stop deactivate docker on container:**  
_$ docker stop [dockerId]_

**Remove docker from container:**  
_$ docker rm [dockerId]_

**Environment settings:**    
_$ docker-machine env_

**Restart docker virtual machine:** 
_$ docker-machine restart_

**Enter into docker node shell:**  
_$ docker exec -it [processId] /bin/bash_

**Check logging with command line:**    
_$ docker logs [processId]_

**Delete all containers:**
docker rm $(docker ps -a -q)

**Delete all images:**
_$ docker rmi $(docker images -q)_

## Swagger integrations
Read more: [http://swagger.io/open-source-integrations/](http://swagger.io/open-source-integrations/)


