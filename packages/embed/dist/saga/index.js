const fs = require('fs');
const path = require('path');

/* eslint strict: ["off"] */

'use strict';

module.exports = {
    description: 'Add saga',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'user',
        validate: value => {
            if (/.+/.test(value)) {
                return fs.readdirSync(`${process.cwd()}/app/sagas`).indexOf(`${value}.js`)>=0 ? 'A saga with this name already exists' : true;
            }

            return 'The name is required';
        },
    },
    ],
    actions: (data) => {
        const actions = [
            {
                type: 'add',
                path: `${process.cwd()}/app/sagas/{{name}}.js`,
                templateFile: './saga/saga.js.hbs',
                abortOnFail: true,
            },
        ];

        // Test
        if (data.wantGenerateTests) {
            actions.push(
                {
                    type: 'add',
                    path: `${process.cwd()}/app/sagas/__tests__/{{camelCase name}}.test.js`,
                    templateFile: './sagas/saga.test.js.hbs',
                    abortOnFail: true,
                }
            )
        }

        return actions;
    },
};
