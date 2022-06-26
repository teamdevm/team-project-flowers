FROM node:carbon

WORKDIR /flowers/api

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

