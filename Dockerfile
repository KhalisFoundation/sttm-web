FROM node:14.21.3

# Set working directory
WORKDIR /app

# Add build argument for NODE_ENV
ARG NODE_ENV=$NODE_ENV
ENV NODE_ENV=$NODE_ENV

RUN echo "NODE_ENV is $NODE_ENV"

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
EXPOSE 8080 8081

RUN npm run build

# Start the application
CMD ["npm", "start"]
