# Base image for building
FROM node:latest AS builder 

# Initialize a working directory
WORKDIR /home/marketverse

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the project
RUN yarn run build 

# Base image for running
FROM node:iron-alpine AS runner 

# Initialize a working directory
WORKDIR /app

# Copy build output and necessary files
COPY --from=builder /home/marketverse/.next ./.next
COPY --from=builder /home/marketverse/node_modules ./node_modules
COPY --from=builder /home/marketverse/package.json .
COPY --from=builder /home/marketverse/yarn.lock .

# Expose ports
EXPOSE 3000

# Start the application
CMD ["yarn", "run", "start"]


# not tested may have error 
