const cli = require('./../lib')

const questions = [{
  type: 'input',
  name: 'firstName',
  message: 'What\'s your first name? '
}, {
  type: 'input',
  name: 'lastname',
  message: 'What\'s your last name? '
}, {
  type: 'input',
  name: 'phoneNumber',
  message: 'What\'s your phone number? '
}]

const run = async () => {
  const answers = await cli.prompt(questions)

  console.log(answers)
}

run()
