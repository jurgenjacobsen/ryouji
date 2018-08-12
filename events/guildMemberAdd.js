const Discord = require('discord.js');
const db = require('quick.db');

module.exports = (client, member) => {
	if (member.user.id === client.user.id) return;


db.fetch(`guildSettings_${member.guild.id}_welcomeMessage_`).then(welcomeMsg => {
let welcomeMessage;
if(welcomeMsg !== null) {
 welcomeMessage = welcomeMsg.replace('{user}', member).replace('{guild}', member.guild.name);
} else if(welcomeMsg == null) {
 const text = 'Bem-vindo {user} ao **{guild}**!';
 welcomeMessage = text.replace('{user}', member.user).replace('{guild}', member.guild.name);
}

 db.fetch(`guildSettings_${member.guild.id}_welcomeChannel_`).then(welcomeChannel => {
    if(welcomeChannel == null) return console.log('Não é possível enviar uma mensagem de boas-vindas, pois não há nada na configuração welcomeChannel, GUILD : ' + member.guild.name + ' (' + member.guild.id + ')');
		if (client.channels.get(welcomeChannel)) {
     db.fetch(`guildSettings_${member.guild.id}_welcomeMessageAutoDel`).then(auto => {
       if(auto == null) {
			    member.guild.channels.get(welcomeChannel).send(welcomeMessage)
       } else {
          member.guild.channels.get(welcomeChannel).send(welcomeMessage).then(msg => msg.delete(10000))
       }
     });
		}
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
}

 db.fetch(`guildSettings_${member.guild.id}_auto-role_`).then(role => {
  if(role !== null) {
    let memberRole = member.guild.roles.get(role);
    member.addRole(memberRole)
  } else return console.log('')
 });
};