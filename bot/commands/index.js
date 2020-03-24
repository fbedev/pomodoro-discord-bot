const makeBreakCommand = require('./break')
const helpCommand = require('./help')
const notFoundCommand = require('./notFound')
const startCommand = require('./start')
const stopCommand = require('./stop')
const resetCommand = require('./reset')
const statusCommand = require('./status')

const COMMANDS = [
  {
    docs: '`start {minutes}` a 🍅 of a given duration, by default `start 25`. I will send you a direct message once the 🍅 completes.',
    handler: startCommand,
    keyword: 'start',
    shortcuts: ['s', 'new']
  },
  {
    docs: '`complete` a 🍅 or break in progress.',
    handler: stopCommand,
    keyword: 'complete',
    shortcuts: ['c', 'stop']
  },
  {
    docs: '`restart` a 🍅 or break in progress. The custom duration specified for the previous 🍅 will be respected.',
    handler: resetCommand,
    keyword: 'restart',
    shortcuts: ['r', 'reset']
  },
  {
    docs: '`timeleft` displays the time left on the current 🍅.',
    handler: statusCommand,
    keyword: 'timeleft',
    shortcuts: ['t', 'status']
  },
  {
    docs: '`shortbreak {minutes}` starts a short break, by default 5 minutes long. I will send you a message once the break completes.',
    handler: makeBreakCommand(5),
    keyword: 'shortbreak',
    shortcuts: ['sb', 'short', 'break']
  },
  {
    docs: '`longbreak {minutes}` starts a long break, by default 30 minutes long. I will send you a message once the break completes.',
    handler: makeBreakCommand(30),
    keyword: 'longbreak',
    shortcuts: ['lb', 'long']
  },
  {
    docs: '`help` display this help again.',
    handler: helpCommand,
    keyword: 'help',
    shortcuts: ['h', 'about']
  }
]

function matchCommandHandler (cmdStr) {
  const command = COMMANDS
    .find(({ keyword, shortcuts }) =>
      [keyword, ...shortcuts].some(str => str === cmdStr)
    )

  if (!command) return null
  return command.handler
}

async function commandHandler (client, pomodoro, message) {
  const { content } = message

  const words = content
    .replace(/<@!.*?>/gm, '')
    .trim()
    .toLowerCase()
    .split(/\s/)

  const cmd = words[0]
  const handler = matchCommandHandler(cmd)

  const handlerArgs = {
    client,
    commands: COMMANDS,
    message,
    pomodoro,
    words
  }

  if (handler) {
    await handler(handlerArgs)
  } else {
    await notFoundCommand(handlerArgs)
  }
}

module.exports = commandHandler
