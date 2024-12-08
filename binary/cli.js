#!/usr/bin/env node

const { program } = require('commander');
const { BuildInfo } = require('../dist/build');
const { envToJson } = require('../dist/create');
const { verifyEnvIntegrity } = require('../dist/integrity');

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
        if (verifyEnvIntegrity()) {
            console.log("The .env file is intact when compared to the envinfo.json template.");
        }
    });


program.parse(process.argv);