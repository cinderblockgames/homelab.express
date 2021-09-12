FROM nginx:1.21-alpine

COPY web/ /usr/share/nginx/html

# use dev htaccess
COPY .htaccess /var/www/html/.htaccess

EXPOSE 80

HEALTHCHECK CMD curl --fail http://localhost:80 || exit 1
