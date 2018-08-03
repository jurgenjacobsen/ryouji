// This event executes when a new member joins a server. Let's welcome them!
const db = require('quick.db')
const Discord = require('discord.js');

module.exports = (client, member) => {
	// Load the guild's settings
	if (member.user.id === client.user.id) return;

const guildSettings = client.settings.get(member.guild.id);

const byeMessage = guildSettings.byeMessage.replace('{{user}}', member.tag).replace('{{guild}}', member.guild.name);

 db.fetch(`guildSettings_${member.guild.id}_byeChannel_`).then(byeChannel => {
		if (client.channels.get(byeChannel)) {
			member.guild.channels.get(byeChannel).send(byeMessage)
		}
		return console.log('')
 });

 db.fetch(`guildSettings_${member.guild.id}_counter_`).then(counter => {
    const count = member.guild.members.size.toString();

    const e = count.replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:')

    if(member.guild.channels.get(counter)) {
      member.guild.channels.get(counter).setTopic(`${e} Membros`)
   }

});


};