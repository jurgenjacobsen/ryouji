const Discord = require('discord.js');

module.exports = (client, member) => {
	// Load the guild's settings
	if (member.user.id === client.user.id) return;
	const guildSettings = client.settings.get(member.guild.id);

	if (!guildSettings.welcomeChannel) return console.log('Não é possível enviar uma mensagem de boas-vindas, pois não há nada na configuração welcomeChannel');
	if (guildSettings.welcomeEnabled !== 'true') return;

	const welcomeMessage = guildSettings.welcomeMessage.replace('{{user}}', member.user).replace('{{guild}}', member.guild.name);

	if (guildSettings.welcomeEnabled === 'true') {
		if (member.guild.channels.find('name', guildSettings.welcomeChannel)) {
			member.guild.channels.find('name', guildSettings.welcomeChannel).send(welcomeMessage).catch((e) => client.log('log', `Impossível enviar a mensagem de bem-vindo em (${guildSettings.welcomeChannel}) no servidor ${member.guild.name} (${member.guild.id}): \n ${e}`, 'Error'));
		}
		return console.log(`Impossível enviar a mensagem de bem-vindo em (${guildSettings.welcomeChannel}) no servidor ${member.guild.name} (${member.guild.id})' ou não existe`);
	}


	const logWelcome = new Discord.RichEmbed()
		.setColor('GREEN')
		.setTitle('Novo Membro!')
		.addField('TAG', member.user.tag)
		.addField('ID', member.user.id);

	if (guildSettings.logNewMember === 'true') {
		member.guild.channels.find('name', guildSettings.modLogChannel).send({ embed: logWelcome }).catch((e) => client.log('log', `Não é possível enviar mensagem para o canal de log (${guildSettings.modLogChannel}) em ${member.guild.name} (${member.guild.id}): \n ${e}`, 'Error'));
	}
};