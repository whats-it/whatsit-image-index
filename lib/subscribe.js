'use strict';

var createPod = require('../lib/createPod');
var PODNAME = '';
var AwPubSub = require('whatsit-pubsub')

exports.on = function () {

  let awPubSub = new AwPubSub()
  awPubSub.nrp.on('whatsit/index/bigquery', function(data, channel) {
    console.log('connectionName =>' + channel);
    console.log('data =>' + data);

    console.log('bigquery ok!')

    //create bigquery pod !
    PODNAME = "bigquery";
    createPod.spawnPod(PODNAME, data)

    // if (channel.includes("bigquery")) {
    //   console.log('bigquery ok!')
    //
    //   //create bigquery pod !
    //   PODNAME = "bigquery";
    //   createPod.spawnPod(PODNAME)
    //
    // }
    //
    // if (channel.includes("spreadsheet")) {
    //   console.log('spreadsheet ok!')
    //
    //   //create spreadsheet pod !
    //   PODNAME = "spreadsheet";
    //   createPod.spawnPod(PODNAME)
    // }
  })
}

