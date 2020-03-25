const { noInProgress, stop } = require('../templates')
const { NoTimerError } = require('../../lib/pomodoro')
const { getContextPrefix } = require('../utils')

async function stopCommand ({
  client,
  message,
  pomodoro,
  words
}) {
  const { author } = message
  const contextPrefix = getContextPrefix(message)

  try {
    const { type } = await pomodoro.stopPomodoro(author.id)
    return message.reply(stop(contextPrefix, type))
  } catch (err) {
    if (!(err instanceof NoTimerError)) throw err
    return message.reply(noInProgress(contextPrefix))
  }
}

module.exports = stopCommand
