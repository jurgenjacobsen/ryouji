exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const fs = require('fs');
	const Discord = require('discord.js');

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

		message.channel.bulkDelete(messages).catch((error) => {
			console.log(error.stack);
			return message.reply('Houve um erro ao excluir as mensagens');
		});
	});

  const Embed = new Discord.RichEmbed()
   .setTitle('<:green:463073006093336576> Limpado com Sucesso!')
   .setColor(client.color)
   .setFooter(message.author.tag, message.author.displayAvatarURL);
  message.channel.send(message.author, Embed);};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['clear'],
	permLevel: 2,
  manu: false
};

exports.help = {
	name: 'Clear',
	category: '🛃 Moderação',
	description: 'Limpa uma quatidade de mensagens',
	usage: 'r!clear [quantidade]'
};
