# PHP hello docker
HelloWorld REST service example with corresponding Dockerfile.
Stubs are generated and copied from PHP generator.

## Build docker image
docker build -t krixerx/docker-php .

## Start microservice
docker run -d -p 80:80 krixerx/docker-php

## Check microservice
http://192.168.99.100/hello/some_name

