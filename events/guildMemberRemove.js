// This event executes when a new member joins a server. Let's welcome them!
const db = require('quick.db')
const Discord = require('discord.js');

module.exports = (client, member) => {
	// Load the guild's settings
	if (member.user.id === client.user.id) return;

db.fetch(`guildSettings_${member.guild.id}_byeMessage_`).then(byeMessage => {
let text;
 if(byeMessage == null) {
   let tex = client.config.defaultSettings.byeMessage;
   text = tex.replace('{user}', member.tag).replace('{guild}', member.guild.name);
 } else {
   text = byeMessage;
 }
 db.fetch(`guildSettings_${member.guild.id}_byeChannel_`).then(byeChannel => {
		if (client.channels.get(byeChannel)) {
			member.guild.channels.get(byeChannel).send(text)
		}
		return console.log('')
 });
});

var str = member.guild.memberCount.toString();
var i = 0, strLength = str.length;
 
for(i; i < strLength; i++) {
 
 str = str.replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:')
 

   db.fetch(`guildSettings_${member.guild.id}_counter_`).then(counter => {
    if(member.guild.channels.get(counter)) {
      member.guild.channels.get(counter).setTopic(`${str} Membros`)
    }
  });
 };
};