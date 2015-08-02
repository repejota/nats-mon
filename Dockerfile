FROM ubuntu:14.04
MAINTAINER Raul Perez "repejota@gmail.com"
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y nodejs npm
COPY https://github.com/repejota/nats-mon.git /nats-mon
RUN ls -al /nats-mon
