const fs = require('fs');
const path = require('path');

/* eslint strict: ["off"] */

'use strict';

module.exports = {
    description: 'Add reducer',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'user',
        validate: value => {
            if (/.+/.test(value)) {
                return fs.readdirSync(`${process.cwd()}/app/reducers`).indexOf(`${value}.js`)>=0 ? 'A reducer with this name already exists' : true;
            }

            return 'The name is required';
        },
    },
    ],
    actions: (data) => {
        const actions = [
            {
                type: 'add',
                path: `${process.cwd()}/app/reducers/{{name}}.js`,
                templateFile: './reducer/reducer.js.hbs',
                abortOnFail: true,
            },
        ];

        // Test
        if (data.wantGenerateTests) {
            actions.push(
                {
                    type: 'add',
                    path: `${process.cwd()}/app/reducers/__tests__/{{camelCase name}}.test.js`,
                    templateFile: './reducers/reducer.test.js.hbs',
                    abortOnFail: true,
                }
            )
        }

        return actions;
    },
};
