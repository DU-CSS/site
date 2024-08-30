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
FROM nginx:stable

# Install Certbot and the Nginx plugin
RUN apt-get update && apt-get install -y certbot python3-certbot-nginx && apt-get clean

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Create directory for Certbot challenges
RUN mkdir -p /var/www/certbot

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443

# Run entrypoint script
ENTRYPOINT ["/entrypoint.sh"]
