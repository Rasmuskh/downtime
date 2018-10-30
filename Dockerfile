#############################################################
# Dockerfile to build a container for 'downtime'
# To run it:
# > docker-compose up
# Navigate to http://localhost:8504/
#############################################################

#FROM node:latest
#RUN git clone https://gitlab.maxiv.lu.se/raskja/downtime.git
#WORKDIR downtime
#RUN rm package-lock.json
#RUN npm install
#EXPOSE 8504
#CMD [ "npm", "start" ]


FROM node:8
WORKDIR /home/node/app
COPY package.json ./
RUN npm install --no-cache
COPY . .
