# Search Youtube
## API endpoint, using Node.js/MySQL/Express/YoutubeDataAPIV3

Add a .env file to the root of the project that contains:
MYSQL_HOST='your db host'
MYSQL_USER='your db username'
MYSQL_PASSWORD='your db password'
MYSQL_DATABASE='your db name'
PORT='your port'
MYAPIKEY='your Youtube Data Api V3 Key'
NODE_ENV=development 


To establish utilise nodemon or nodemon index

The default endpoints are listed below and can be called through postman:

## localhost:3003/search
Calling a get request to this endpoint will search the Global Cycling Network and Global Mountain Bike Network youtube channels for the search items in the "search_filter" file, then store the titles and publishedAt dates will be stored in the database.
This endpoint is where the connection to the youtube api is established.

## localhost:3003/videos
Calling a get request to this endpoint will retrieve all the videos in the database.

## localhost:3003/videos/:id
Calling a get or delete request to this endpoint will display or delete the id specified in the “id” parameter.

## localhost:3003/searchDB/?column=value
Calling a get request to this endpoint will search and return a record that matches the given parameters, only single column/value pairs are permitted.

For example localhost:3003/searchDB/?title=dubai will return all records with “dubai” in the title, localhost:3003/searchDB/?date=2016 will return all records containing the year 2016.

