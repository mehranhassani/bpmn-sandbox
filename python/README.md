# Python hello docker
Hello REST service example with corresponding Dockerfile.
REST services defined in Swagger.
Stubs are generated and copied from Python generator.

To build and launch Python hello docker separately follow following instructions.

## Build docker image
Go to the project folder and run command:  
_$ docker build -t krixerx/docker-python ._

## Start microservice
_$ docker run -d -p 5000:8080 krixerx/docker-python_

## Check microservice
[http://192.168.99.100:5000/v2016/06/hello/John](http://192.168.99.100:5000/v2016/06/hello/John)

## Swagger schema
[http://192.168.99.100:5000/v2016/06/ui/](http://192.168.99.100:5000/v2016/06/ui/)
[http://192.168.99.100:5000/v2016/06/swagger.json](http://192.168.99.100:5000/v2016/06/swagger.json)


