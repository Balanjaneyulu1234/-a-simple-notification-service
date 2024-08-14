const { typescript } = require('projen'); 
const { NxMonorepoProject } = require('@aws-prototyping-sdk/nx-monorepo'); 
const { awscdk } = require('projen'); 
const { Terraform } = require('projen-terraform'); 
 

// Define your notification channels 
const notificationChannels = [ 
  'email', 
  'sms', 
  'whatsapp', 
  'ivr', 
  'in-app', 
]; 
 

// Define your shared libraries 
const libraries = [ 
  '@notification-service/common', 
]; 
 

// Create the root project 
const rootProject = new NxMonorepoProject({ 
  name: 'notification-service', 
  defaultReleaseBranch: 'main', 
  devDeps: ['@aws-prototyping-sdk/nx-monorepo'], 
}); 
 

// Create TypeScript projects for each notification channel 
notificationChannels.forEach(channel => { 
  const channelProject = new typescript.TypeScriptProject({ 
    name: channel, 
    parent: rootProject, 
    outdir: `src/channels/${channel}`, 
  }); 
 

// Add AWS CDK and Terraform projects for infrastructure 
  new awscdk.AwsCdkTypeScriptApp({ 
    name: `${channel}-cdk`, 
    parent: channelProject, 
    outdir: `src/channels/${channel}/infra/cdk`, 
  }); 
 

new Terraform({ 
    name: `${channel}-terraform`, 
    parent: channelProject, 
    outdir: `src/channels/${channel}/infra/terraform`, 
  }); 
}); 
 

// Create TypeScript projects for retry mechanism, compliance, status notification, and notification summary 
const coreComponents = [ 
  'retry-mechanism', 
  'compliance', 
  'status-notification', 
  'notification-summary', 
]; 
 

coreComponents.forEach(component => { 
  new typescript.TypeScriptProject({ 
    name: component, 
    parent: rootProject, 
    outdir: `src/${component}`, 
  }); 
}); 
 

// Create TypeScript projects for each shared library 
libraries.forEach(library => { 
  new typescript.TypeScriptProject({ 
    name: library, 
    parent: rootProject, 
    outdir: `shared/${library}`, 
  }); 
}); 
 

// Synthesize the root project 
rootProject.synth(); 
