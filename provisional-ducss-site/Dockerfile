FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run build
RUN ls -l
EXPOSE 3000
CMD ["npm", "run", "start"]