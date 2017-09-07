'use strict';

var NRP = require('node-redis-pubsub');
var config = require('../config/redis');
var nrp = new NRP(config.connector);
var createPod = require('../lib/createPod');
var PODNAME = '';

exports.on = function () {

    //console.log(config);
    nrp.on('whatsit/schedule/connect:*', function(data, channel){

        console.log('connectionName =>' + channel);

        if (channel.includes("bigquery")) {
            console.log('bigquery ok!')

            //create bigquery pod !
            PODNAME = "bigquery";
            createPod.spawnPod(PODNAME)

        }

        if (channel.includes("spreadsheet")) {
            console.log('spreadsheet ok!')

            //create spreadsheet pod !
            PODNAME = "spreadsheet";
            createPod.spawnPod(PODNAME)
        }
        //console.log('data => ' + data);
    });
}

