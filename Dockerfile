FROM nginx:1.21-alpine

COPY web/ /usr/share/nginx/html

# use dev htaccess
COPY .htaccess /var/www/html/.htaccess

# Add shell script
COPY update-cert.sh /etc/periodic/hourly/update-cert
RUN chmod +x /etc/periodic/hourly/update-cert

EXPOSE 80

HEALTHCHECK CMD curl --fail http://localhost:80 || exit 1
