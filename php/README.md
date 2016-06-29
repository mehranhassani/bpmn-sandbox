# PHP hello docker
HelloWorld REST service example with corresponding Dockerfile.
Stubs are generated and copied from PHP generator.

To build and launch PHP hello docker separately follow following instructions.

## Build docker image
Go to the project folder and run command:  
_$ docker build -t krixerx/docker-php ._

## Start microservice
_$ docker run -d -p 80:80 krixerx/docker-php_

## Check microservice
[http://192.168.99.100/hello/John](http://192.168.99.100/hello/John)

