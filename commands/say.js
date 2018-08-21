const got = require('got');

exports.run = async (client, message, args) => { 
   var text = args.join(' ');
   if(!text) return message.reply('Diga algo para Bill escrever')
    const {
        body
    } = await got(`http://belikebill.azurewebsites.net/billgen-API.php?text=${text}`, {
        encoding: null
    });

    await message.channel.send({
        file: {
            attachment: body,
            name: 'bill.jpg'
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['say', 'dizer'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Say',
    category: '🎉 Diversão',
    description: 'Envia um texto por você',
    usage: 'r!say [texto]'
};