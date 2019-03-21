const fs = require('fs');

/* eslint strict: ["off"] */

'use strict';

module.exports = {
    description: 'Add actions',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'user',
        validate: value => {
            if (/.+/.test(value)) {
                return fs.readdirSync(`${process.cwd()}/app/actions`).indexOf(`${value}.js`)>=0 ? 'A action with this name already exists' : true;
            }

            return 'The name is required';
        },
    },
    ],
    actions: (data) => {
        const actions = [
            {
                type: 'add',
                path: `${process.cwd()}/app/actions/{{name}}.js`,
                templateFile: './action/action.js.hbs',
                abortOnFail: true,
            },
        ];

        // Test
        if (data.wantGenerateTests) {
            actions.push(
                {
                    type: 'add',
                    path: `${process.cwd()}/app/actions/__tests__/{{camelCase name}}.test.js`,
                    templateFile: './action/action.test.js.hbs',
                    abortOnFail: true,
                }
            )
        }

        return actions;
    },
};
