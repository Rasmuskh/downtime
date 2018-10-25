#############################################################
# Dockerfile to build a deployment container for 'downtime'
# Based on node, express and mongodb
# To run it:
# > docker-compose up
#############################################################

FROM node:latest
RUN git clone https://gitlab.maxiv.lu.se/raskja/downtime.git
WORKDIR downtime
#RUN git checkout dockerization
RUN rm package-lock.json
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]
