# Node.js hello docker
HelloWorld REST service example with corresponding Dockerfile.  
Stubs are generated and copied from node generator.

To build and launch Node.js hello docker separately follow following instructions.

## Build docker image
Go to the project folder and run command:  
_$ docker build -t krixerx/docker-nodejs ._

## Start microservice
_$ docker run -d -p 49160:8080 krixerx/docker-nodejs_

## Check microservice
[http://192.168.99.100:49160/v2016/06/hello/John](http://192.168.99.100:49160/v2016/06/hello/John)

### Swagger docs
[http://192.168.99.100:49160/docs/](http://192.168.99.100:49160/docs/)

### Swagger REST schema
[http://192.168.99.100:49160/api-docs](http://192.168.99.100:49160/api-docs)


