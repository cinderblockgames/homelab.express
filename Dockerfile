FROM php:7.3-apache
RUN a2enmod rewrite && \
    a2enmod headers && \
    service apache2 restart

COPY web/ /var/www/html

# use dev htaccess
COPY .htaccess /var/www/html/.htaccess

EXPOSE 80
