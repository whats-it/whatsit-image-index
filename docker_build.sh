#!/usr/bin/env bash

SERVICE_NAME="whatsit-image-index"
TAG=$1
AWS_CONTAINER_REGISTRY="539277938309.dkr.ecr.us-west-2.amazonaws.com"


docker build -t $SERVICE_NAME:$TAG .
docker tag $SERVICE_NAME:$TAG $AWS_CONTAINER_REGISTRY/$SERVICE_NAME:$TAG
docker push $AWS_CONTAINER_REGISTRY/$SERVICE_NAME:$TAG

