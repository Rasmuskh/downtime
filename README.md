# Downtime
<p>An application for registering, plotting and viewing downtime at MAX IV.</p>
<p>Starts an Express server running on port 8504. Data is stored using mongo db, running on port 27017. </p>
<p>Stack:  mongodb, node.js, express.js (expressjs.com), pug (pugjs.org)</p>

## List of suggested features
* Make date selection box work on all versions of firefox
* Have a start and an end time and automatically calculate duration as the difference
* add a parameter beamlines present. This will is useful because we no longer count it as downtime when beamlines or absent. having this feature would allow us to compare actual and hypothetical (omnipresent beamlines) downtime.
* change delete button for an archive function.
* New event codes for linac: Laser=LAS, Unplanned Trimming=UT, High level software = HLS
* Revise statistics: Is MTTF even relevant? It is usually used for non-reparable systems.

## Installation
1. create .env in the project root defining the jwt secret: `jwtSecret=[maxiv_jwt_secret]`
2. Run with docker: `docker-compose up` or npm: `npm install && npm start`
