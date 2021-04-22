FROM httpd:latest

COPY web/ /usr/local/apache2/htdocs/

EXPOSE 80
