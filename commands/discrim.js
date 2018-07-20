const Discord = require('discord.js')
exports.run = async (client, message, args, level) => {

	const embed = new Discord.RichEmbed()
		.setColor('WHITE');

	if (isNaN(args[0]) || args[0] > 9999 || args[0] < 1) {

		embed.setFooter('Indique uma discriminação válida! Exemplo: `#0001`');

		return message.channel.send(embed);

	}

	let resp = '';


	client.users.map(function(user) {

		if (user.discriminator == args[0]) return resp += `${user.username}\n`;
		else return;

	})


	embed.setTitle(`Discrim: ${args[0]}`)
		.setDescription(resp)
		.setFooter('Estes foram os membros que eu encontrei com essa descriminação!')

	message.channel.send(embed)

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['discrim', 'discriminator'],
	permLevel: 0
};

exports.help = {
	name: 'Discrim',
	category: '💈 Utilitários',
	description: 'Procura por usuários com essa descriminação.',
	usage: 'r!discrim [discriminator `#0001`]'
};