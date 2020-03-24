const { getTypeIcon } = require('../utils')

const { DISCORD_BOT_NAME } = process.env

const templates = {
  help (commandStr) {
    return `I am a timer bot for the **pomodoro technique**. Issue commands by sending me a direct message or mention me via \`@${DISCORD_BOT_NAME}\`.

  **Available Commands**\n\n${commandStr}`
  },
  notFound (contextPrefix) {
    return `I did not understand that command. 😞 Type \`${contextPrefix}help\` to see a list of available commands.`
  },
  noInProgress (contextPrefix) {
    return `I did not find a 🍅 or ☕ in progress for you. Start a new 🍅 by typing \`${contextPrefix}start\``
  },
  hasProgress (contextPrefix, type) {
    const typeIcon = getTypeIcon(type)
    return `you have a ${typeIcon} in progress. Please use \`${contextPrefix}complete\` to finish the current {} before starting a new one. You can also use \`${contextPrefix}restart\` to reset the current ${typeIcon}`
  },
  reset (duration, type) {
    const typeIcon = getTypeIcon(type)
    return `I reset your **${duration} min** ${typeIcon}. I will message you once the new ${typeIcon} completes`
  },
  break (duration) {
    return `I started a **${duration} min** ☕ for you. I will message you once the break completes`
  },
  start (duration) {
    return `I started a **${duration} min** 🍅 for you. I will message you once the interval completes`
  },
  status (timeLeft, type) {
    const typeIcon = getTypeIcon(type)
    return `There are **${timeLeft}** minutes left on your current ${typeIcon}`
  },
  stop (contextPrefix, type) {
    return `I stopped your ${type === 'break' ? '☕' : '🍅'}. You can start another one any time by typing \`${contextPrefix}start\``
  },
  breakDone (duration) {
    return `Your **${duration} min** break has finished. Type \`start\` to start a new 🍅`
  },
  timerDone (duration) {
    return `Your **${duration} min** 🍅 has finished. Type \`short\` or \`long\` to start a break ☕`
  }
}

module.exports = templates
