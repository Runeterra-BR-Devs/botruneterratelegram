const axios = require('axios');

module.exports = async (ctx, args) => {
    const cardName = args.join(' ');

    try{
        const response = await axios.get('http://botruneterra.com.br:1337/cards/' + encodeURI(cardName));

        ctx.replyWithPhoto(response.data.assets[0].gameAbsolutePath);
    } catch (e) {
        console.error(e);

        return 'Não encontrado';
    }
}