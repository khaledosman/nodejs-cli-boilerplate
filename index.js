#!/usr/bin/env node

const program = require('commander')
const figlet = require('figlet')
const { getCLIVersion } = require('./helpers/get-cli-version')

initCli()

async function initCli () {
  const version = await getCLIVersion()

  program
    .version(version, '-v, --version')

  program
    .option('-f, --force', 'skip confirmation and overwrite existing zipfile')
    .option('-s, --skipBuild', 'specifies whether to trigger webpack build or not')
    .option('-o, --outputPath <path>', 'the path where the zipfile will be written, defaults to current working directory the user is running the cli from')
    .description('creates zipfile for a plugin')
    .action((path = './', options) => {
      console.log('building plugin in %s', path)
    })

  console.log(figlet.textSync('Aliased Imports', {
    // font: 'Dancing Font',
    horizontalLayout: 'full',
    verticalLayout: 'full'
  }))

  program.parse(process.argv)
  // if no commands/arguments specified, show the help
  if (!process.argv.slice(2).length) {
    program.help()
  }
}
