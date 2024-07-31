FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Run the build process
RUN npm run build

# Debugging: list the contents of the /app directory to see if build was successful
RUN ls -la /app

# Copy the build directory to public if it exists
RUN if [ -d "./build" ]; then cp -r ./build ./public; else echo "Build directory not found"; exit 1; fi

RUN chmod +x node_modules/.bin/react-scripts

EXPOSE 3001

ENV BROWSER=none

CMD ["npm", "start"]
