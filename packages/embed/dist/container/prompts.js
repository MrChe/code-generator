const componentExists = require('../utils/componentExists');

function initPrompt(inquirer, answers = {}) {
    const prompts = inquirer.prompt([{
        type: 'list',
        name: 'type',
        message: 'Select the base component type:',
        default: 'Stateless Function',
        choices: () => ['Stateless Function', 'PureComponent', 'Component'],
    },
        {
            type: 'input',
            name: 'name',
            message: 'What should it be called?',
            default: 'Form',
            validate: (value) => {
                if ((/.+/).test(value)) {
                    return componentExists(value) ? 'A component or container with this name already exists' : true;
                }

                return 'The name is required';
            },
        },
        {
            type: 'confirm',
            name: 'wantHeaders',
            default: false,
            message: 'Do you want headers?',
        },
        {
            type: 'confirm',
            name: 'wantLoadable',
            default: true,
            message: 'Do you want to load resources asynchronously?',
        },
        {
            type: 'confirm',
            name: 'wantGenerateTestForContainer',
            default: false,
            message: 'Do you want generate test for container',
        },
        {
            type: 'confirm',
            name: 'wantActionsAndReducer',
            default: true,
            message: 'Do you want an action/type/selector/reducer for this container?',
        },
    ]);

    prompts.then((newAnswers) => {
        Object.assign(newAnswers, answers);
    });

    return prompts;
}

function promptForTestsActionsAndReducer(inquirer, answers = {}) {
    const prompts = inquirer.prompt({
        type: 'confirm',
        name: 'wantGenerateTests',
        default: false,
        message: 'Do you want generate tests action/reducer/selector',
    });

    prompts.then((newAnswers) => {
        Object.assign(newAnswers, answers);
    });

    return prompts;
}

function promptForSaga(inquirer, answers = {}) {
    const prompts = inquirer.prompt([
        {
            type: 'confirm',
            name: 'wantSaga',
            default: true,
            message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
        }
    ]);

    prompts.then((newAnswers) => {
        Object.assign(newAnswers, answers);
    });

    return prompts;
}

function promptForTestForSaga(inquirer, answers = {}) {
    const prompts = inquirer.prompt([
        {
            type: 'confirm',
            name: 'wantGenerateTestForSaga',
            default: false,
            message: 'Do you want generate test for saga',
        }
    ]);

    prompts.then((newAnswers) => {
        Object.assign(newAnswers, answers);
    });

    return prompts;
}

module.exports = function (inquirer) {
    const basePrompt = initPrompt(inquirer);

    return basePrompt.then((answers) => {
        if (answers.wantActionsAndReducer) { // Need action/reducer/selector ? if need next question for test!
            return promptForTestsActionsAndReducer(inquirer, answers).then((answers) => { // Need test action/reducer/selector?
                return promptForSaga(inquirer, answers).then((answers) => { // Need saga ? if need next question for test!
                    if (answers.wantSaga) {
                        return promptForTestForSaga(inquirer, answers) // Question test for saga!
                    } else {
                        return true; // End questions!
                    }
                })
            }).catch((err) => console.log('ERROR', err));
        }

        return promptForSaga(inquirer, answers).then((answers) => {
            if (answers.wantSaga) {
                return promptForTestForSaga(inquirer, answers) // Question test for saga!
            } else {
                return true; // End questions!
            }
        }).catch((err) => console.log('ERROR', err));
    });
};
