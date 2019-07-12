# Downtime
<p>An application for registering, plotting and viewing downtime at MAX IV.</p>
<p>Starts an Express server running on port 8504. Data is stored using mongo db, running on port 27017. </p>
<p>Stack:  mongodb, node.js, express.js (expressjs.com), pug (pugjs.org)</p>

## Overview
The application is written in javascript and Jade (previously called Pug). Initially the following tutorial was used for developing this app: https://www.youtube.com/watch?v=k_0ZzvHbNBQ&list=PLillGF-RfqbYRpji8t4SxUkMxfowG4Kqp. Although the current app has diverged a lot from this tutorial it might still be helpful if you are new to javascript and need to work on this application.
### Root directory
The heart of the application is app.js. It defines the various routes used in the application.
note to develop on this app, you will probably want to run it on localhost for debugging. Since login uses MAXIV ID you will need a VPN connection to the white network. You will also need a file called .env located in the root directory of the app. This file is not part of the git repository for safety reasons. The .env file contains the jwtSecret used for login authentication. 
### Views directory 
Views contains the Jade files defining what is on each of the pages in the app. It also contains Javascript functions, which facilite more dynamic feature in the app (for example filtering or searching the tables). The layout.pug page contains the navigation bar. This page is extended at the top of all other pages. The index.pug page contains the most functionality, since it is connecting to both the schedule and the downtime collections in the database in order to allow dynamic filtering, plotting calculation of statistics. If you are going to develop on this app, then it might be easier to start by looking at the smaller pages like layout.pug and downtimeevent.pug.
### Routes directory
Contains additional routes. Everything in here could also have been in app.js, but separating it makes things a bit more structured. these files are called from within app.js.
### Models
### Node_modules directory
### Public directory


## List of suggested features
* Make date selection box work on all versions of firefox
* Have a start and an end time and automatically calculate duration as the difference
* add a parameter beamlines present. This will is useful because we no longer count it as downtime when beamlines or absent. having this feature would allow us to compare actual and hypothetical (omnipresent beamlines) downtime.
* Revise statistics: Is MTTF even relevant? It is usually used for non-repairable systems.

## Installation
1. create .env in the project root defining the jwt secret: `jwtSecret=[maxiv_jwt_secret]`
2. Run with docker: `docker-compose up` or npm: `npm install && npm start`
