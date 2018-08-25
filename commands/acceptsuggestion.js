exports.run = async (client, message, args) => { 
 const Discord = require('discord.js');
 let text = args.join(' ');
  let Embed = new Discord.RichEmbed()
      .setTitle('**Sugestão Aceita**')
      .setColor(client.color)
      .setDescription(text)
      .setFooter('Sugerido por Wukknous#2750')
   client.channels.get('478568892260679680').send(Embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['accsug'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'AcceptSuggest',
    category: '🔧 Sistema',
    description: 'none',
    usage: 'none'
};