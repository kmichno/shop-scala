FROM ubuntu:18.04

MAINTAINER Kamil Michno <kamyk43.michno@student.uj.edu.pl>

RUN useradd ujot --create-home

RUN apt-get update
RUN apt-get install -y vim unzip curl git
    
ENV SBT_OPTS -Xmx2G -XX:+UseConcMarkSweepGC -XX:+CMSClassUnloadingEnabled -Xss2M -Duser.timezone=GMT
	
RUN apt-get install -y gnupg2 apt-utils ca-certificates

RUN apt-get install -y openjdk-8-jdk && \
    apt-get clean;
RUN apt-get install ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f;

RUN echo "deb https://dl.bintray.com/sbt/debian /" | tee -a /etc/apt/sources.list.d/sbt.list
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2EE0EA64E40A89B84B2DF73499E82A75642AC823

RUN apt-get update
RUN apt-get install -y scala sbt

USER ujot

CMD echo "Hello World"