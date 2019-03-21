const fs = require('fs');
const path = require('path');

/* eslint strict: ["off"] */

'use strict';

module.exports = {
    description: 'Add selector',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What should it be called?',
            default: 'user',
            validate: value => {
                if (/.+/.test(value)) {
                    return fs.readdirSync(`${process.cwd()}/app/selectors`).indexOf(`${value}.js`) >= 0 ? 'A selector with this name already exists' : true;
                }

                return 'The name is required';
            },
        },
        {
            type: 'confirm',
            name: 'wantGenerateTest',
            default: true,
            message: 'Do you want generate test',
        }
    ],
    actions: (data) => {
        const actions = [
            {
                type: 'add',
                path: `${process.cwd()}/app/selectors/{{name}}.js`,
                templateFile: './selector/selector.js.hbs',
                abortOnFail: true,
            },
        ];

        // Test
        if (data.wantGenerateTests) {
            actions.push(
                {
                    type: 'add',
                    path: `${process.cwd()}/app/selectors/__tests__/{{camelCase name}}.test.js`,
                    templateFile: './selector/selector.test.js.hbs',
                    abortOnFail: true,
                }
            )
        }

        return actions;
    },
};
