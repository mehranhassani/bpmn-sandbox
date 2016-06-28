# Node.js hello docker
HelloWorld REST service example with corresponding Dockerfile.
Stubs are generated and copied from node generator.

## Build docker image
docker build -t krixerx/docker-nodejs .

## Start microservice
docker run -d -p 49160:8081 krixerx/docker-nodejs

## Check microservice
http://192.168.99.100:49160/v2016/06/hello/John

### Swagger docs
http://192.168.99.100:49160/docs/

### Swagger REST schema
http://192.168.99.100:49160/api-docs


