#!/usr/bin/env node

const { program } = require('commander');
const { BuildInfo } = require('../build');
const { envToJson } = require('../create');
const { verifyEnvIntegrity } = require('../integrity');

program
    .command('build')
    .description('Builds a .env file from envinfo.json file.')
    .action(() => {
        BuildInfo();
    });

program
    .command('create')
    .description('Create a envinfo.json file from your .env file (edit the envinfo.json on defaultValue attribute to remove private information ).')
    .action(() => {
        envToJson();
    });


program
    .command('integrity')
    .description('Check if the .env file is intact')
    .action(() => {
        verifyEnvIntegrity();
    });


program.parse(process.argv);