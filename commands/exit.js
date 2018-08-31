exports.run = async (client, message, args) => { 
 const Discord = require('discord.js');
 const Embed = new Discord.RichEmbed()
 .setTitle('<a:454704719282044940:470364256962084866> Reiniciando...')
 .setColor(client.color);
  
message.channel.send(message.author, Embed)
            .then(msg => {
                msg.delete(5000);
                client.destroy(true);
            })
            .then(() => client.login(process.env.TOKEN));

 process.exit(2200)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['shutdown'],
    permLevel: 10,
    manu: false
};

exports.help = {
    name: 'Exit',
    category: '🔧 Sistema',
    description: 'Indisponível',
    usage: 'Indisponível'
};