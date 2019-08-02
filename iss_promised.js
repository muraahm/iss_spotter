const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org/?format=json');
};


const fetchCoordsByIP = function(body) {
  const IP = JSON.parse(body).ip;
  return request('https://ipvigilante.com/json/' + IP);
};


const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body).data;
  return request('http://api.open-notify.org/iss-pass.json?lat=' + latitude + '&lon=' + longitude);
};

const printPassTimes = function(object) {
  for (let passTime of object) {
    let date = new Date(0);
    date.setUTCSeconds(passTime.risetime);
    console.log('Next pass at ' + date + ' for ' + passTime.duration + ' seconds!');

  }
};


const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const {response } = JSON.parse(data);
      return response;
    });
};


module.exports = { nextISSTimesForMyLocation, printPassTimes };