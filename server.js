'use strict';

//Application Dependencies
const express = require('express');
const cors = require('cors');

//Load Environment Variables From the .env file
require('dotenv').config();

//Application Setup 
const PORT = process.env.PORT;
const app = express();

app.get('/location', (request, response) =>{
  //Log in this for proof of life
  console.log(request.query.data, 'is the query that came from the search field in the browser.');
  //Sending the query for when we move to real data
  const locationData = searchToLatLong(request.query.data);
  //What's sent back to browser
  console.log(locationData);
  response.send(locationData);
});

//Helper Functions
function searchToLatLong(query) {
  //Loading file of mock data for now, will use API call later
  const geoData = require('./data/geo.json');
  //Passes through constrcutor to tidy up data
  const location = new Location(geoData.results[0]);
  //Adding actual search query back on and sending back to browser
  location.search_query = query;
  return location;
}

//Function to tidy up data and send browser info it needs
function Location(data) {
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}

//Make sure server is listening for requests

app.listen(PORT, ()=> {
  console.log(`server up on ${PORT} port`);
});