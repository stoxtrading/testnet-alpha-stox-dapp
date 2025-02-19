FROM node:23

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of your code
# (excluding node_modules and other unnecessary files - make sure you have a .dockerignore)
COPY . .

# In case there are any conflicts with node_modules
RUN rm -rf node_modules
RUN pnpm install --frozen-lockfile

# Build your application
RUN pnpm build

# Start the application
# CMD ["pnpm", "dev"]

# Install a simple http server to serve static content
RUN npm install -g serve

# Expose port 4173 (Vite's default production port)
EXPOSE 4173

# Serve the built application
CMD ["serve", "-s", "dist", "-l", "4173"]