#!/usr/bin/env node
var index = require('../lib/index')
var config = require('../config/env.json')

process.env.AWS_ACCESS_KEY_ID = config.aws.AWS_ACCESS_KEY_ID
process.env.AWS_SECRET_ACCESS_KEY = config.aws.AWS_SECRET_ACCESS_KEY
process.env.AWS_REGION = ""


main()

function main () {
  index.run((err, res) => {
  });
}
