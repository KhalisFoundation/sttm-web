FROM node:18

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
RUN npm install

# Set the environment and expose your app port
ARG NODE_ENV
RUN echo "Build argument NODE_ENV value: $NODE_ENV"
ENV NODE_ENV=$NODE_ENV
RUN echo "Environment variable NODE_ENV value: $NODE_ENV"
EXPOSE 8080 8081

RUN npm run build

# Start the application
CMD ["npm", "start"]
