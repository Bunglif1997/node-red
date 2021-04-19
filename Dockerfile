FROM ubuntu:16.04

RUN \
  sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \
  apt-get update && \
  apt-get -y upgrade && \
  apt-get install -y build-essential curl && \
  apt-get install -y software-properties-common && \
  curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
  apt-get install -y nodejs

RUN npm install -g pm2

RUN useradd -ms /bin/bash nodered

USER nodered
WORKDIR /home/nodered

ENV HOME /home/nodered
COPY . .
RUN npm install

CMD ["pm2", "start", "pm2_nodered.yaml", "--no-daemon"]