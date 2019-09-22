FROM debian

MAINTAINER Adrian Graczyk

RUN apt update

RUN apt install -y scala git wget

RUN mkdir /usr/lib/slick

RUN git clone https://github.com/slick/slick.git /usr/lib/slick/

RUN mkdir /home/sbt

RUN wget https://dl.bintray.com/sbt/debian/sbt-1.1.1.deb -P /home/sbt/

RUN dpkg -i /home/sbt/sbt-1.1.1.deb
