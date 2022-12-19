FROM node:latest AS ngbuilder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
#RUN npm run test
RUN npm install -g @angular/cli

CMD ["/bin/sh",  "-c",  "npm run start-with-proxy"]
