FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#ENV API_URL http://torrentsearch-service:9876
ENV API_URL http://10.0.0.2:9876


ADD bot.js /usr/src/app/bot.js
ADD Terminal.js /usr/src/app/Terminal.js
ADD package.json /usr/src/app/package.json
RUN npm install
#EXPOSE 3000
CMD [ "npm", "start" ]

