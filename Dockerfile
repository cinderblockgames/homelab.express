FROM httpd:latest

COPY web/ /usr/local/apache2/htdocs/

RUN cp /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/ && \
    cp /etc/apache2/mods-available/headers.load /etc/apache2/mods-enabled/

EXPOSE 80
