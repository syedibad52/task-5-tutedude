# node alpine is smaller than the full node image
FROM node:18-alpine

WORKDIR /app

# install dependencies first (for caching)
COPY package*.json ./
RUN npm install --production

# then copy everything else
COPY . .

EXPOSE 3000

# start the express server
CMD ["npm", "start"]
