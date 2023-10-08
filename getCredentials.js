const fs = require('fs');

function getCredentials() {
    const data = fs.readFileSync('config.txt');
    return JSON.parse(data);
}

module.exports = fs.getCredentials;