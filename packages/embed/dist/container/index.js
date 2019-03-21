/**
 * Container Generator
 */

const path = require('path');
const prompts = require('./prompts');

module.exports = {
    description: 'Add a container component',
    prompts: prompts,
    actions: (data) => {
        // Generate index.js and index.test.js
        var componentTemplate; // eslint-disable-line no-var

        switch (data.type) {
            case 'Stateless Function': {
                componentTemplate = path.resolve(__dirname, './stateless.js.hbs');
                break;
            }
            default: {
                componentTemplate = path.resolve(__dirname, './class.js.hbs')
            }
        }

        const actions = [
            {
                type: 'add',
                path: `${process.cwd()}/app/containers/{{properCase name}}/{{properCase name}}.js`,
                templateFile: componentTemplate,
                abortOnFail: true,
            }
        ];

        // If they want actions and a reducer, generate actions.js, constants.js,
        // reducer.js and the corresponding tests for actions and the reducer
        if (data.wantActionsAndReducer) {
            actions.push(
                // Actions
                {
                    type: 'add',
                    path: `${process.cwd()}/app/actions/{{camelCase name}}.js`,
                    templateFile: path.resolve(__dirname, '../action/action.test.js.hbs'),
                    abortOnFail: true,
                },
                // Type
                {
                    type: 'add',
                    path: `${process.cwd()}/app/types/{{camelCase name}}.js`,
                    templateFile: path.resolve(__dirname, '../type/type.js.hbs'),
                    abortOnFail: true,
                },
                // Selectors
                {
                    type: 'add',
                    path: `${process.cwd()}/app/selectors/{{camelCase name}}.js`,
                    templateFile: path.resolve(__dirname, '../selector/selector.test.js.hbs'),
                    abortOnFail: true,
                },
                // Reducer
                {
                    type: 'add',
                    path: `${process.cwd()}/app/reducers/{{camelCase name}}.js`,
                    templateFile: path.resolve(__dirname, '../reducer/reducer.test.js.hbs'),
                    abortOnFail: true,
                }
            );
        }

        // Sagas
        if (data.wantSaga) {
            actions.push(
                {
                    type: 'add',
                    path: `${process.cwd()}/app/sagas/{{camelCase name}}.js`,
                    templateFile: path.resolve(__dirname, '../saga/saga.test.js.hbs'),
                    abortOnFail: true,
                }
            );
        }

        // Lodable
        if (data.wantLoadable) {
            actions.push({
                type: 'add',
                path: `${process.cwd()}/app/containers/{{properCase name}}/Loadable.js`,
                templateFile: path.resolve(__dirname, '../component/loadable.js.hbs'),
                abortOnFail: true,
            });
        }

        if (data.wantGenerateTestForSaga) {
            actions.push(
                {
                    type: 'add',
                    path: `${process.cwd()}/app/sagas/__tests__/{{camelCase name}}.test.js`,
                    templateFile: path.resolve(__dirname, '../saga/saga.test.js.hbs'),
                    abortOnFail: true,
                }
            )
        }

        if (data.wantGenerateTestForContainer) {
            actions.push(
                {
                    type: 'add',
                    path: `${process.cwd()}/app/containers/{{properCase name}}/__tests__/{{properCase name}}.test.js`,
                    templateFile: path.resolve(__dirname, './test.js.hbs'),
                    abortOnFail: true,

                }
            );
        }

        // Test action/reducer/selector
        if (data.wantGenerateTests) {
            actions.push(
                {
                    type: 'add',
                    path: `${process.cwd()}/app/reducers/__tests__/{{camelCase name}}.test.js`,
                    templateFile: path.resolve(__dirname, '../reducer/reducer.test.js.hbs'),
                    abortOnFail: true,
                },
                {
                    type: 'add',
                    path: `${process.cwd()}/app/selectors/__tests__/{{camelCase name}}.test.js`,
                    templateFile: path.resolve(__dirname, '../selector/selector.test.js.hbs'),
                    abortOnFail: true,
                },
                {
                    type: 'add',
                    path: `${process.cwd()}/app/actions/__tests__/{{camelCase name}}.test.js`,
                    templateFile: path.resolve(__dirname, '../action/action.test.js.hbs'),
                    abortOnFail: true,
                }
            )
        }

        return actions;
    },
};
