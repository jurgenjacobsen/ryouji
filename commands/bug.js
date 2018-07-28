const Discord = require('discord.js');
const moment = require('moment');
const db = require('quick.db');

exports.run = async (client, message, args) => {

if(!args[0]) return message.reply('O que você quer que eu faça ? **send** = Enviar ou **save** = armazenar ou...?')

 switch (args[0]) {
   case 'send':
    const channelBugEmbed = new Discord.RichEmbed()
    .setTitle('<:BugHunter:454695663628713994> Bug Reportado')
    .setColor('#23272A')
    .setDescription('Você acabou de fazer um report de bug para meus administradores!')
    .addField('Descrição do Bug', args[1])
    .setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL);

   message.channel.send(channelBugEmbed);

//
//
//
    const supportBugEmbed = new Discord.RichEmbed()
    .setTitle('<:BugHunter:454695663628713994> Bug Reportado')
    .setColor('#23272A')
    .setDescription(message.author + ' acabou de fazer um report de bug para você!')
    .addField('Descrição do Bug', args[1])
    .addField('ID do Autor', message.author.id, true)
    .addField('Tag', message.author.tag, true)
    .addField('Conta criada em', moment.utc(message.author.createdAt).format('LLLL'))
    .setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL);
    client.channels.get('470355257965150238').send(`==========================================\nㅤㅤㅤㅤㅤㅤ${message.author}\n==========================================`);
    client.channels.get('470355257965150238').send(supportBugEmbed)
   break;
  
   case 'save':
    db.add(`reports_${message.id}`, 1);
    message.channel.send('Salvei seu report!');

  const supportBugEmbeded = new Discord.RichEmbed()
    .setTitle('<:BugHunter:454695663628713994> Bug Reportado')
    .setColor('#23272A')
    .setDescription(message.author + ' acabou de fazer um report de bug para você!')
    .addField('Descrição do Bug', args[1])
    .addField('ID do Autor', message.author.id, true)
    .addField('Tag', message.author.tag, true)
    .addField('Conta criada em', moment.utc(message.author.createdAt).format('LLLL'))
    .setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL);
    client.channels.get('470355257965150238').send(`==========================================\nㅤㅤㅤㅤㅤㅤ${message.author}\n ㅤㅤㅤㅤ${message.id}\n==========================================`);
    client.channels.get('470355257965150238').send(supportBugEmbeded)
   break;



 }

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['bug', 'ticket'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Bug',
	category: '🔧 Sistema',
	description: 'Envia um report de bug para os administradores do bot.',
	usage: 'r!bug'
};
