#!/usr/bin/env node

'use strict';

const open = require('open');
const { program, Option } = require('commander');
const { execSync } = require('child_process');

const pkg = require('../package.json');

program
  .addOption(new Option('-p, --port <number>', 'port number').default(8000, 'port 8000'))
  .parse();;

if (program.versions) {
  console.info('\n  ' + pkg.version + '\n');
  process.exit(0);
}

async function main() {
  const cwd = process.cwd();
  const { port } = program.opts();
  const cmd = [
    'python3',
    '-m',
    'http.server',
    `${port}`
  ].join(' ');
  const url = `http://localhost:${port}`;
  await open(url);
  execSync(cmd, {
    stdio: 'inherit',
    cwd,
  });
}

main().then().catch(console.log);
