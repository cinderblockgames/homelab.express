FROM httpd:latest

COPY web/ /usr/local/apache2/htdocs/

# override htaccess with dev version
COPY .htaccess /usr/local/apache2/htdocs/

# enable htaccess options
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i 's#AllowOverride [Nn]one#AllowOverride All#' /usr/local/apache2/conf/httpd.conf

EXPOSE 80
