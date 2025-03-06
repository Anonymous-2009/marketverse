# Base image for building
FROM node:latest AS builder 

# Initialize a working directory
WORKDIR /home/marketverse

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# install pnpm 
RUN npm install -g pnpm@latest-10

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Set environment variable for Clerk (Replace with your actual key)
ARG CLERK_PUBLISHABLE_KEY
ENV CLERK_PUBLISHABLE_KEY=$CLERK_PUBLISHABLE_KEY

# Build the project
RUN pnpm run build 

# Base image for running
FROM node:latest AS runner 

# Initialize a working directory
WORKDIR /app

# Copy build output and necessary files
COPY --from=builder /home/marketverse/.next ./.next
COPY --from=builder /home/marketverse/node_modules ./node_modules
COPY --from=builder /home/marketverse/package.json .
COPY --from=builder /home/marketverse/pnpm-lock.yaml .

# Expose ports
EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "start"]
