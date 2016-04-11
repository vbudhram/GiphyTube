/**
 * Created by vijay.budhram on 11/14/15.
 */
'use strict';

var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.listen(port, function () {
    console.log('Server started on port ' + port);
});

app.use(express.static('public'));
