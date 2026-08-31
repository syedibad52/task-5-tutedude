# ============================================================
# Frontend Dockerfile — Node.js Express Server
# ============================================================
# Base Image: node:18-alpine (minimal Alpine Linux with Node 18)
# Exposes:    Port 3000
# Entrypoint: npm start (runs server.js)
# ============================================================

FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first — this layer is cached unless
# package.json or package-lock.json changes, speeding up rebuilds.
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application source code
COPY . .

# Document the port this container listens on
EXPOSE 3000

# Start the Express server
CMD ["npm", "start"]
