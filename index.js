const { Telegraf } = require('telegraf')

const dotenv = require('dotenv');

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN, {username: process.env.BOT_USERNAME})

bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username
})

bot.start((ctx) => ctx.reply('Seja bem vindo'))

bot.on('message', async ctx => {
    const message = ctx.message.text;
    const command = message.split(' ').shift() ?? message;
    const args = message.split(' ').splice(1);

    if(! command.startsWith('!')) {
        return;
    }

    try {
        await require(`./commands/${command.substr(1)}`)(ctx, args);
    } catch (e) {
        // comando não foi encontrado, não precisa de feedback no chat

    }
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))