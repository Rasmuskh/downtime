FROM node:latest
RUN git clone https://gitlab.maxiv.lu.se/raskja/downtime.git
WORKDIR downtime
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]
