FROM node:18

# Install PostgreSQL and system tools
RUN apt-get update && apt-get install -y \
    postgresql postgresql-client sudo curl net-tools iputils-ping

# Create a non-root user
RUN useradd -ms /bin/bash nodeuser

# Give the user passwordless sudo access for systemctl PostgreSQL commands
RUN echo "nodeuser ALL=NOPASSWD: /bin/systemctl start postgresql, /bin/systemctl stop postgresql, /bin/systemctl restart postgresql" >> /etc/sudoers

# Switch to app directory
WORKDIR /usr/src/app

# Copy and install backend dependencies
COPY package*.json ./
RUN npm install
RUN ls -la node_modules && npm list

# Copy app source code
COPY . .

# Switch to non-root user
USER nodeuser

# Expose frontend port
EXPOSE 3000

# Run the server
CMD ["node", "backend/server.js"]