### Quick Guide
| [Connecting Webapps to Databases](https://github.com/getfutureproof/fp_guides_wiki/wiki/Connecting-Webapps-to-Databases) | [Docker Compose 101](https://github.com/getfutureproof/fp_guides_wiki/wiki/Docker-Compose-101) | \

### Demo repo
To run the demo repo code:
1. Fork and clone this repo
2. Open the client:
   - `cd client`
   - `open index.html` / `python -m http.server` / `http-server`
   
3. Start a server and database combo (there are 3 to choose from!)
   1. no database
       - `cd server-nodb`
       - `npm install`  
       - `npm start` 
   2. with postgres database &
   3. with mongo database
       - `cd server-postgresql` / `cd server-mongodb`
       - `docker-compose up`
       - to stop and keep data `docker-compose down`
       - to stop and remove all artifacts `docker-compose down --volumes --remove-orphans`


# Exercises
1. Prepare a small database
    - It is your choice of what type of db and what service you use
    - Add at least one resource (ie. collection/table) and seed it with some data (ie. documents or rows)

2. Make a docker-compose.yaml that runs your api service and your database
  
3. Create a basic API with database integration
    - Use the express and cors libraries plus the node driver to match your database choice
    - Include at least 2 CRUD operations
  
***NB: Creating a front-end client is optional, you can also interact with your API via [Hoppscotch](https://hoppscotch.io/), the browser console or other tools***

