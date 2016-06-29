# Java hello docker
Hello REST service example with corresponding Dockerfile.
Java and Maven based project.

## Requirements
1) Java
2) Maven

## Generate Java REST stubs from swagger

REST schemas defined in Swagger located in /src/main/resources/api.yaml

Read more:
1) https://github.com/swagger-api/swagger-codegen/wiki/Server-stub-generator-HOWTO 
2) https://github.com/swagger-api/swagger-codegen/blob/master/README.md

## Build war package
1) mvn clean install
- generates war file to /target folder

## Build Docker image
1) Go to the Java Docker project in your computer.
Run following docker command to build docker image:
1) docker build -t krixerx/docker-java .
Check images:
2) docker images

## Set up right Java
By default OpenJdk is used on Docker which doesn't match.
Install the Oracle JRE:
docker run java:8-jre-alpine

## Launch the docker image to container
docker run -d -p 8080:8080 krixerx/docker-java

## Check processes: 
docker ps

## Check results
Check url: http://localhost:8080/javarest/rest/hello/John
