const { prompt } = require('../src/cli')

const questions = [{
  type: 'input',
  name: 'firstName',
  message: 'What\'s your firsr name? '
}, {
  type: 'input',
  name: 'lastname',
  message: 'What\'s your last name? '
}, {
  type: 'input',
  name: 'phoneNumber',
  message: 'What\'s your phone number? ',
}]

const run = async () => {
  const answers = await prompt(questions)

  console.log(answers)
}

run()
