FROM node

#Mongo inviroment Varianle
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=qwerty

#Create a app directory
WORKDIR /app

#Install app dependencies
COPY package*.json ./

#Run npm install
RUN npm install

#Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]