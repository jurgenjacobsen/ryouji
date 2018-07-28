exports.run = async (client, message, args) => { 
 const msg = message;
 const Discord = require('discord.js');
 const db = require('quick.db');
 const send = require('quick.hook');
 const c = require('currency-formatter');
  
  let bank = db.fetch(`guildBank_${msg.guild}`);

  

 const itens = {
  "Plano_Mensal": {
     price: "12500",
     description: ""
   }

 };
if(msg.guild) {

switch (args[0]) {
  case "ping" : {
    message.channel.send(`Ping: **${Date.now() - message.createdTimestamp}**ms `);
    break;
  }

  case "account" : {
    const Embed = new Discord.RichEmbed()
    .setTitle('Account')
    .setColor(client.config.cores.padrão)
    .setAuthor(`Dono: ${msg.guild.owner.user.tag}`, msg.guild.owner.avatarURL)
    .setThumbnail(`${msg.guild.iconURL}?size=512`)
    .addField('Banco do Servidor: ', `:dollar: **${c.format(bank, { code: 'BRL' })}**`)
    .setFooter(msg.guild.name)

    msg.channel.send(Embed)
    break;
   }
  }
} else {
 msg.reply('Você deve estar em um servidor!')
}
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['guild', 'guild'],
    permLevel: 9,
    manu: true
};

exports.help = {
    name: 'Server',
    category: '🔨 Desenvolvimento',
    description: 'No Desc',
    usage: 'No example'
};