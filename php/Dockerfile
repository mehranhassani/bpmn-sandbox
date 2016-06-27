FROM ubuntu

# install curl and php
RUN apt-get -qq update
RUN apt-get install -qq -y curl php7.0 php7.0-cli

# Install unzip
RUN apt-get install -y unzip

# install composer
RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/bin/composer

# install silex
RUN mkdir -p /var/www/silex && cd /var/www/silex && composer require silex/silex:~2.0

# add application source file
ADD src/index.php /var/www/silex/

# run PHP server
CMD php -S 0.0.0.0:80 -t /var/www/silex