exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const fs = require('fs');
	const Discord = require('discord.js');

	const gS = await client.settings.get(message.guild.id);

	await message.delete();
	
  const user = message.mentions.users.first();
  
	const amount = !!parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);
  
	if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply('Você não tem permissão para isso!')

	if (!amount) return message.reply('Deve especificar um valor para excluir!');
  
	if (!amount && !user) return message.reply('Deve especificar um usuário e quantidade, ou apenas uma quantidade, de mensagens para limpar!');
  
	message.channel.fetchMessages({
		limit: amount,
	}).then((messages) => {
		if (user) {
			const filterBy = user ? user.id : client.user.id;
			messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
		}

		if (gS.logPurge === 'true') {
			var msgs = '';
			messages.forEach(g => msgs += client.config.purgeLogFormat.replace('{{mID}}', g.id).replace('{{mA}}', `${g.author.tag} (${g.author.id})`).replace(
				'{{mTS}}', g.createdTimestamp).replace('{{mC}}', `${g.content}`))
			console.log(msgs);
			fs.writeFile('purge-log.txt', msgs, (err) => {
				if (err) {
					console.error(err);
					return message.reply('Houve um erro ao salvar o arquivo de log temporário.');
				}
				message.guild.channels.find('name', gS.modLogChannel).send('Messages purged', new Discord.Attachment('./purge-log.txt'))
					.then(() => fs.unlink('purge-log.txt', (err) => {
						if (err) {
							console.error(err);
							return message.reply('Houve um erro ao excluir o arquivo de log temporário');
						}
					}));
			});

		}

		message.channel.bulkDelete(messages).catch((error) => {
			console.log(error.stack);
			return message.reply('Houve um erro ao excluir as mensagens');
		});
	});

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['clear'],
	permLevel: 2
};

exports.help = {
	name: 'Clear',
	category: '🛃 Moderação',
	description: 'Limpa uma quatidade de mensagens',
	usage: 'r!clear [quantidade]'
};