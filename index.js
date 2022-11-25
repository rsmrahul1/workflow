const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);

  const filesList = core.getInput('files-list');
  console.log(`filesList from action js ${filesList}!`);

  // Split using a space character
  let files = filesList.split(' ');

  for (let file of files) {
    console.log(`file from loop js ${file}!`);
    let content = fs.readFileSync(file, 'utf8')
    console.log(`file from loop js ${content}!`);
  }

  const baseRepoDir = 'stage-branch';

  
  for (let file of files) {
    console.log(`file from baseRepoDir loop js ${file}!`);
    let content = fs.readFileSync(path.join(baseRepoDir,file), 'utf8')
    console.log(`file from baseRepoDir loop js ${content}!`);
  }

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}