#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
var program = require('commander')
let argvs = process.argv.slice(2)
let config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'))
let folders = config.folders.split(' ')
let argLen = argvs.length
let command = argvs[0]


program
  .arguments('<folder>')
  .option('-s, --setting <folders>', 'default: app doc assets/prototype assets/ui')
  .parse(process.argv);


function setFolders() {
  argvs.shift()
  config.folders = argvs.join(' ')
  fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(config))
}

function mkdirsSync(dirname) {
  //console.log(dirname);  
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

function createFolders() {
  folders.forEach((path) => {
    try {
      mkdirsSync(argvs[0] + '/' + path)
    } catch (err) {
      if (err.code !== 'EEXIST') throw err
    }
  })
}



switch (command) {
  case '-s':
    setFolders()
    break
  default:
    if (argvs.length === 1) {
      createFolders()
    } else {
      console.log('wrong params')
    }
}