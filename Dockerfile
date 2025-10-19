# Use a lightweight Node.js image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose Port
EXPOSE 5173

# Default Command
CMD ["npm", "run", "dev"]