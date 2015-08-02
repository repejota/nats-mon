FROM ubuntu:14.04
MAINTAINER Raul Perez "repejota@gmail.com"
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y git nodejs nodejs-legacy npm
RUN git clone https://github.com/repejota/nats-mon.git /nats-mon
RUN cd /nats-mon && npm install
RUN ls -al /nats-mon
