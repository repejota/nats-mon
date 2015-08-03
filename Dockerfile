FROM ubuntu:14.04
MAINTAINER Raul Perez "repejota@gmail.com"
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y vim-nox wget git nodejs nodejs-legacy npm golang
RUN cd tmp && wget https://github.com/nats-io/gnatsd/releases/download/v0.6.0/gnatsd-v0.6.0-linux-amd64.tar.gz
RUN mkdir /opt/gnatsd && cd /opt/gnatsd && tar xvzmf /tmp/gnatsd-v0.6.0-linux-amd64.tar.gz .
RUN git clone https://github.com/repejota/nats-mon.git /opt/nats-mon
RUN /opt/gnatsd/gnatsd -m 8222 &
RUN cd /opt/nats-mon && npm install
RUN cd /opt/nats-mon && npm start &
CMD /bin/bash
