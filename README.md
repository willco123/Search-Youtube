# Search Youtube

## Search for youtube videos and store the titles and associated channel names in a database!

Add a .env file to the root of the project that contains:
MYSQL_HOST='Your db host'  
MYSQL_USER='Your db username'  
MYSQL_PASSWORD='Your db password'  
PORT='Your port'  
MYAPIKEY='Your Youtube Data Api V3 Key'

The project requires an instance of MYSQL, the user needs to have privileges to create and modify a database.

Head to https://developers.google.com/youtube/v3/getting-started to grab a Youtube Data API v3 key.

Run nodemon in the root of the project to establish the server and call the following endpoints!

## /search

Calling a get request to this endpoint will search youtube for the search items in the "search_filter" file, then store the titles and dates in the database along with the associated channels.
Take care not have blank lines in the search file as the youtube data api has a quota for the amount of items that can be searched per day, and vague queries will expire this.

## /videos

Calling a get request to this endpoint will retrieve all the videos in the database. You can specifiy the ID in the url to search for a specific item.

## /channels

Calling a get request to this endpoint will retrieve all the channels in the database. You can specifiy the ID in the url to search for a specific item.

## Search for specific items

Navigating to the channels or videos endpoint and appending a query in the format ?column=value, will allow you to search for specific items.
Accepted column names are equivalent to those named in the database and are as follows:
Videos:
id
title
date
channel_id

Channels:
id
channel_name

Examples:
/videos/1 Will return the the video with an "id" of 1
/videos/?title=lucid Would return all videos with "lucid" in the title
/channels/?channel_name=mellow Would return all channels named mellow
