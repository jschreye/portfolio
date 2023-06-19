FROM nginx:1.23-alpine

# Install dependencies
RUN apk update && apk upgrade \
    && apk add --no-cache --quiet --update \
    	  openssl vim curl bash zsh git gettext

# Generation des certificats et cles au nom du student
RUN	mkdir -p /etc/nginx/ssl/private /etc/nginx/ssl/certs
RUN     openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/nginx/ssl/private/localhost.key \
        -out /etc/nginx/ssl/certs/localhost.crt \
        -subj "/C=CH/ST=Lausanne/L=Renens/O=42/OU=42/CN=localhost/UID=localhost"
# TODO: Make this work

# Expose the port the Nginx server will be running on
EXPOSE 80 443

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]