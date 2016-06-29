# Python hello docker
Hello REST service example with corresponding Dockerfile.
REST services defined in Swagger.
Stubs are generated and copied from Python generator.

## Build docker image
docker build -t krixerx/docker-python .

## Start microservice
docker run -d -p 5000:8080 krixerx/docker-python

## Check microservice
http://192.168.99.100:5000/v2016/06/hello/John

## Swagger schema
http://192.168.99.100:5000/v2016/06/ui/
http://192.168.99.100:5000/v2016/06/swagger.json


