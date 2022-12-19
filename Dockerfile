FROM node:16.0.0-alpine

WORKDIR /app

## add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

CMD ["npm run", "start-with-proxy"]
