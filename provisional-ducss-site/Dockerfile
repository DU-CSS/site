FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY build .
RUN npm run build
EXPOSE 3000
RUN ls -l
CMD ["npm", "run", "start"]