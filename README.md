# Megogo-code-generator 
Plop generator for Megogo projects which use React or/and Redux  
 
## Usage 
##### Note: Project names you are able to use: `ui` `embed` 
 
1. Install plop globally: 
 
    `yarn global add plop` or `npm install -g @megogo-code-generator/<project-name>` 
2. Install `@megogo-code-generator` in your project: 
 
    `yarn add @megogo-code-generator/<project-name>` or `npm install @megogo-code-generator/<project-name>` 
3. Create a `plopfile.js` in the root folder of your project, with the following content: 
    ```javascript 
    module.exports = require('@megogo-code-generator/<project-name>'); 
    ```
    
## Deployment

To publish changes only for the project you are working on:

`lerna publish --scope=@megogo-code-generator/<project-name>`