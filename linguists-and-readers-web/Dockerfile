# Stage 1: Build the application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM nginx:stable-alpine

# Copy the build artifacts to the nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]