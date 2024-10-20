# Use an official Node.js image for building the frontend
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the frontend app
RUN npm run build

# Use nginx to serve the frontend build
FROM nginx:alpine

# Copy the built files from the previous step to the nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to make the container accessible
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
