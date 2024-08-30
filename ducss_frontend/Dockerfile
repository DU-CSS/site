# Stage 1: Build the Svelte application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Svelte application
RUN npm run build

# Stage 2: Setup Nginx with Certbot
FROM nginx:stable-alpine

# Install Certbot and OpenSSL
RUN apk add --no-cache certbot openssl

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443

# Run Certbot to obtain certificates and start Nginx
CMD ["/bin/sh", "-c", "certbot --nginx -d ducss.ie -d www.ducss.ie --non-interactive --agree-tos --email ducss@csc.tcd.ie && nginx -g 'daemon off;'"]
