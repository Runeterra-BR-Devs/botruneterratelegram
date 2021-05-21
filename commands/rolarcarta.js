const axios = require('axios');

module.exports = async (ctx, _) => {

    try{
        const response = await axios.get('http://botruneterra.com.br:1337/random');

        ctx.replyWithPhoto(response.data.assets[0].gameAbsolutePath);
    } catch (e) {
        console.error(e);

        return 'Não encontrado';
    }
};