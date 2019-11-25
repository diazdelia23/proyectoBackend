FROM node:10

ARG amb=production

ENV NODE_ENV ${amb}
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
# Bundle app source
COPY . .




RUN npm install
RUN npm install --save cors



EXPOSE 3000
CMD [ "node", "app.js" ]
