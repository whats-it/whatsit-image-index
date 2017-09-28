'use strict';

var spawn = require('child_process').spawn
var fs = require('fs');
var POD_PREFIX = 'whatsit-image-index-'
var POD_NAME = ''
var TOPIC_PREFIX = 'whatsit'
var IMAGE = 'gcr.io/whatsit-174908/whatsit-image-index-'

var PODID = '';
var podConfig = require('../config/pod.json')

exports.spawnPod = function (POD_NAME, datasetId) {
    var unixTime = fetch_unix_timestamp();
    PODID = POD_NAME + unixTime;
    console.log('unix time PODID =>' + PODID)
    podConfig.metadata.name = POD_PREFIX + PODID
    podConfig.metadata.labels.podId = PODID
    //podConfig.spec.containers.name = POD_PREFIX + POD_NAME
    //podConfig.spec.containers.image = IMAGE + POD_NAME + ':latest';
    let env = {
        name: "DATA_SET_ID",
        value: datasetId
    }
    podConfig.spec.containers[0].env.push(env)

    let configFile = podConfig.metadata.name + '.json'
    let configString = JSON.stringify(podConfig)
    fs.writeFileSync(configFile, configString, 'utf8')

    let cmd = `kubectl create -f ${configFile} && rm -f ${configFile}`
    runInBash(cmd, (err) => {
        if (err) {
            console.log('spawnScheduler error : ' + err)
            //Remove Scheduler from DB
        } else {
            console.log('spawnScheduler done')
        }
    })
}

function runInBash(cmd, cb) {
    console.log("runInBash: " + cmd);
    //var oldSpawn = spawn.spawn;
    //spawn.spawn = mySpawn(oldSpawn);

    var proc = spawn('/bin/bash', ['-c', cmd ])
     proc.stdout.pipe(utils.lineStream(log.info))
     proc.stderr.pipe(utils.lineStream(log.error))
    // proc.on('error', cb)
    proc.on('error', function (err) {
        console.log(err)
        cb(err);
    });
    proc.stdout.on('data', function(data) {
        console.log(data.toString());
    });
    proc.stderr.on('data', function(data) {
        console.log(data.toString());
    });

    proc.on('close', function(code) {
        var err
        console.log("close: " + code);
        if (code) {
            err = new Error(`Command "${cmd}" failed with code ${code}`)
            err.code = code
            // err.logTail = log.getTail()
        }
        cb(code)
    })
}

function mySpawn(oldSpawn) {
    console.log('spawn called');
    console.log(JSON.stringify(arguments));
    var result = oldSpawn.apply(this, arguments);
    return result;
}

var fetch_unix_timestamp = function() {
    return Math.floor(new Date().getTime() / 1000);
}
