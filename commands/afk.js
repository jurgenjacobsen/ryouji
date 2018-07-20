const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args, level) => {

	const status = new db.table('AFKs');

	let afk = await status.fetch(message.author.id);

	const embed = new Discord.RichEmbed().setColor(0xffffff)

	if (!afk) {
		embed.setFooter('Você está AFK agora');
		status.set(message.author.id, args.join(' ') || `Desculpe, ${message.author.username} está AFK.`);
	} else {
		embed.setFooter('Você não esta mais AFK.');
		status.delete(message.author.id);
	}

	message.channel.send(embed);

}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['afk'],
	permLevel: 0
};

exports.help = {
	name: 'AFK',
	category: '💈 Utilitários',
	description: 'Torna uma pessoa como AFK',
	usage: 'r!afk'
};