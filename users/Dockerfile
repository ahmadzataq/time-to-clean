FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN chmod +x node_modules/.bin/react-scripts

EXPOSE 3002

ENV BROWSER=none

CMD ["npm", "start"]