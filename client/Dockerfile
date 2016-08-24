FROM nginx

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl git ruby ruby-dev rubygems && \
    curl -sL https://deb.nodesource.com/setup | bash - && \
    apt-get -y install python build-essential nodejs

# Copy angular files
COPY . /tmp

# Installation
#RUN curl -sL https://deb.nodesource.com/setup | bash -

RUN cd /tmp && npm install npm -g
RUN npm install -g bower
RUN npm install -g grunt
RUN npm install -g grunt-cli
RUN gem install sass
RUN gem install compass
RUN npm cache clean
RUN npm install
#RUN bower install -g

# Building
WORKDIR /tmp
RUN grunt build
RUN cp -R /tmp/dist/. /usr/share/nginx/html
RUN rm -rf /tmp
WORKDIR /usr/share/nginx/html

# Open port and start nginx
EXPOSE 80