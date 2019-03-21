# Code-generator 
Plop generator for projects which use React or/and Redux  
 
## Usage 
##### Note: Project names you are able to use: `ui` `embed` 
 
1. Install plop globally: 
 
    `yarn global add plop` or `npm install -g @code-generator/<project-name>` 
2. Install `@code-generator` in your project: 
 
    `yarn add @code-generator/<project-name>` or `npm install @code-generator/<project-name>` 
3. Create a `plopfile.js` in the root folder of your project, with the following content: 
    ```javascript 
    module.exports = require('@code-generator/<project-name>'); 
    ```
    
## Deployment

To publish changes only for the project you are working on:

`lerna publish --scope=@code-generator/<project-name>`
