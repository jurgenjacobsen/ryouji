const Discord = require('discord.js');
const db = require('quick.db');

module.exports = (client, member) => {
	// Load the guild's settings
	if (member.user.id === client.user.id) return;
	const guildSettings = client.settings.get(member.guild.id);

	if (!guildSettings.welcomeChannel) return console.log('Não é possível enviar uma mensagem de boas-vindas, pois não há nada na configuração welcomeChannel');
	if (guildSettings.welcomeEnabled !== 'true') return;

	const welcomeMessage = guildSettings.welcomeMessage.replace('{{user}}', member.user).replace('{{guild}}', member.guild.name);

 db.fetch(`guildSettings_${member.guild.id}_welcomeChannel_`).then(welcomeChannel => {
		if (client.channels.get(welcomeChannel)) {
			member.guild.channels.get(welcomeChannel).send(welcomeMessage).catch((e) => client.log('log', `Impossível enviar a mensagem de bem-vindo em (${guildSettings.welcomeChannel}) no servidor ${member.guild.name} (${member.guild.id}): \n ${e}`, 'Error'));
		}
 });

 db.fetch(`guildSettings_${member.guild.id}_counter_`).then(counter => {
    const count = member.guild.members.size.toString();

    const e = count.replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:')

    if(member.guild.channels.get(counter)) {
      member.guild.channels.get(counter).setTopic(`${e} Membros`)
   }

 });

 db.fetch(`guildSettings_${member.guild.id}_auto-role_`).then(role => {
  if(role !== null) {
    let memberRole = member.guild.roles.get(role);
    member.addRole(memberRole)
  }
 });
};