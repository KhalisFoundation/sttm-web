FROM node:14.21.3

# Set working directory
WORKDIR /app

# Install required packages for keyring
RUN apt-get update && apt-get install -y gnupg2 curl lsb-release

# Add the new keyring for apt
RUN curl -fsSL https://packages.debian.org/debian-archive-keyring.gpg | tee /etc/apt/trusted.gpg.d/debian-archive.gpg > /dev/null

# Update apt and install mysql client
RUN apt-get update && apt-get install -y default-mysql-client

# Copy application code
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps

# Set the environment to production and expose your app port
ARG NODE_ENV=production
ENV NODE_ENV=production
EXPOSE 8080 8081

RUN npm run build

# Start the application
CMD ["npm", "start"]
