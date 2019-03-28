#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
var program = require('commander')
let argvs = process.argv.slice(2)
let package = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'))
let config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'))
let command = argvs[0]


program
  .version(package.version)
  .usage('[options] <folders>|<collection>')
  .name('autoproj')
  .description('Create your project folders structure quickly')
  .option('-s, --setting <folders>', 'setting default folders')
  .option('-c, --collection <collectionName>:<folders>', 'setting your collection folders')
  .option('-n, --new <collectionName>', 'create the folders accodring to your collection')
  .option('-l, --list', 'list all collections')
  .parse(process.argv);


function saveConfig(config) {
  fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(config))
}

function setDefaultFolders() {
  argvs.shift()
  config.default = argvs.join(' ')
  saveConfig(config)
}

function setCollectionFolders() {
  argvs.shift()
  var collectionName = argvs[0].split(':')[0]
  var firstFolder = argvs[0].split(':')[1]
  argvs.shift()
  argvs.unshift(firstFolder)
  config[collectionName] = argvs.join(' ')
  saveConfig(config)
}

function mkdirsSync(dirname) {
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
  var folders = config.default
  folders.split(' ').forEach((path) => {
    try {
      mkdirsSync(argvs[0] + '/' + path)
    } catch (err) {
      if (err.code !== 'EEXIST') throw err
    }
  })
}

function createCollectionFolders() {
  argvs.shift()
  var collectionName = argvs[0].split(':')[0]
  var dirFolder = argvs[0].split(':')[1]

  if(!config.hasOwnProperty(collectionName)) {
    console.log('Cant find the collection in the config file')
    return
  }

  config[collectionName].split(' ').forEach((path) => {
    try {
      mkdirsSync(dirFolder + '/' + path)
    } catch (err) {
      if (err.code !== 'EEXIST') throw err
    }
  })
}


function listCollections() {
  for(key in config) {
    console.log(key, '\t', config[key])
  }
}


switch (command) {
  case '-s':
    setDefaultFolders()
    break
  case '-c':
    setCollectionFolders()
    break
  case '-n':
    createCollectionFolders()
    break
  case '-l':
    listCollections()
    break
  default:
    if (argvs.length === 1) {
      createFolders()
    } else {
      program.help()
    }
}