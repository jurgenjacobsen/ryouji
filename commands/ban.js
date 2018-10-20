exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const guildSettings = client.settings.get(message.guild.id);
	const Discord = require('discord.js');
	let member = message.mentions.members.first();
	if (!member) return message.reply('Por favor mencione um membro válido deste servidor');
	if (!member.bannable) return message.reply('Eu não posso banir este usuário! Eles têm um papel maior? Eu tenho permissões de proibição?');
	const reason = args.splice(1, args.length).join(' ') || `Sem motivo :)`;

	message.guild.ban(member, `${message.author.username} Baniu este usuário por ${reason}`).then(() => {
			message.reply(`${member.user.tag} (${member.user.id}) banido por ${message.author.tag} Por: ${reason}`);
			const embed = new Discord.RichEmbed()
				.setColor('RED')
				.setTitle('Ban')
				.addField(`Usuário`, `${member.user.tag} (${member.user.id})`, true)
				.addField(`Moderador`, `${message.author.tag} (${message.author.id})`, true)
				.addField(`Motivo`, `${reason}`, true);
		})
		.catch(error => message.reply(`Desculpe ${message.author} Eu não pude banir este usuário pois : ${error}`));

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['ban'],
	permLevel: 3,
  manu: true
};

exports.help = {
	name: 'Ban',
	category: '🛃 Moderação',
	description: 'Hora da marreta do Ban',
	usage: 'r!ban [@user] [motivo]'
};