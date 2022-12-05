FROM node:19-alpine3.15

WORKDIR /dist

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

CMD [ "npm" , "start"]