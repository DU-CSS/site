#!/bin/sh

# Start Nginx in the background
nginx &

# Wait for Nginx to start properly
sleep 10

# Run Certbot to obtain the certificates
certbot --nginx -d ducss.ie -d www.ducss.ie --non-interactive --agree-tos --email ducss@csc.tcd.ie

# Check if Certbot successfully generated certificates
if [ ! -f /etc/letsencrypt/live/ducss.ie/fullchain.pem ]; then
    echo "Certbot failed to generate certificates."
    exit 1
fi

# Restart Nginx to apply the SSL certificates
nginx -s reload

# Keep the container running
exec nginx -g 'daemon off;'
