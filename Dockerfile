FROM node:14

# create app directory
WORKDIR /app

#dependencies
COPY package.json /app

RUN npm install

COPY . /app

CMD ["node", "server.js"]

