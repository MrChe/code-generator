/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const path = require('path');

const componentExists = require('../utils/componentExists');

module.exports = {
    description: 'Add an unconnected component',
        prompts: [{
            type: 'list',
            name: 'type',
            message: 'Select the type of component',
            default: 'Stateless Function',
            choices: () => ['Stateless Function', 'PureComponent', 'Component'],
        },
        {
            type: 'input',
            name: 'name',
            message: 'What should it be called?',
            default: 'Button',
            validate: (value) => {
                if ((/.+/).test(value)) {
                    return componentExists(value) ? 'A component or container with this name already exists' : true;
                }

                return 'The name is required';
            },
        },
        {
            type: 'confirm',
            name: 'wantLoadable',
            default: false,
            message: 'Do you want to load the component asynchronously?',
        }
    ],
    actions: (data) => {
        // Generate index.js and index.test.js
        let componentTemplate;

        switch (data.type) {
            case 'Stateless Function': {
                componentTemplate = path.resolve(__dirname, './stateless.js.hbs');
                break;
            }
            default: {
                componentTemplate = path.resolve(__dirname, './class.js.hbs');
            }
        }

        const actions = [
            {
                type: 'add',
                path: `${process.cwd()}/app/components/{{properCase name}}/{{properCase name}}.js`,
                templateFile: componentTemplate,
                abortOnFail: true,
            },
            {
                type: 'add',
                path: `${process.cwd()}/app/components/{{properCase name}}/__test__/{{properCase name}}.test.js`,
                templateFile: path.resolve(__dirname, './test.js.hbs'),
                abortOnFail: true,
            }
        ];

        // If want Loadable.js to load the component asynchronously
        if (data.wantLoadable) {
            actions.push({
                type: 'add',
                path: `${process.cwd()}/app/components/{{properCase name}}/Loadable.js`,
                templateFile: path.resolve(__dirname, './loadable.js.hbs'),
                abortOnFail: true,
            });
        }

        return actions;
    },
};
