FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Correct the source directory if needed
COPY ./build ./public

RUN chmod +x node_modules/.bin/react-scripts

EXPOSE 3001

ENV BROWSER=none

CMD ["npm", "start"]