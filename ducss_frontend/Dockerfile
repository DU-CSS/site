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

# Stage 2: Setup Nginx with SSL
FROM nginx:stable-alpine

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output from the previous stage
# COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/build /usr/deploy
RUN sudo chown -R 755 /usr/deploy



# Expose ports 80 and 443
EXPOSE 80   
EXPOSE 443

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
