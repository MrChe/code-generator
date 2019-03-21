const fs = require('fs');
const path = require('path');

/* eslint strict: ["off"] */

'use strict';

module.exports = {
    description: 'Add type',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What should it be called?',
            default: 'user',
            validate: value => {
                if (/.+/.test(value)) {
                    return fs.readdirSync(`${process.cwd()}/app/selectors`).indexOf(`${value}.js`) >= 0 ? 'A type with this name already exists' : true;
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
    actions: () => {
        const actions = [
            {
                type: 'add',
                path: `${process.cwd()}/app/types/{{name}}.js`,
                templateFile: './type/type.js.hbs',
                abortOnFail: true,
            },
        ];

        return actions;
    },
};
