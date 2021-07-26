const express = require('express');
const path = require('path');

const ngApp = express();

ngApp.use(express.static('./dist/dudii-medical-cards-ng'));

ngApp.get('/*', function (request, response) {
  response.sendFile(path.join(__dirname, '/dist/dudii-medical-cards-ng/index.html'));
});

ngApp.listen(process.env.PORT || 8080);
