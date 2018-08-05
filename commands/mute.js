const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  var guildSettings = client.settings.get(message.guild.id);

  const user = message.mentions.users.first();
  const modlog = message.guild.channels.find('name', guildSettings.modLogChannel);
  if (!modlog) return message.reply('Não foi possível encontrar o canal de log mod');
  const reason = args.splice(1, args.length).join(' ') || `Sem motivo`;

  var muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Mutado');
  if (!modlog) return message.reply('Eu não consigo encontrar um canal de log mod');
  if (!muteRole) {
    message.guild.createRole({name: 'Mutado', color: 'DARKER_GREY', permissions: 36766720}).then(() => message.reply('Como não havia um cargo "Mutado", um foi criado')).catch(()=> {return message.reply('Não é possível criar o cargo `Mutado` que ainda não estava presente')});
    muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Mutado');
  }
  if (message.mentions.users.size < 1) return message.reply('Você deve mencionar alguém para silenciá-los.');
  const embed = new Discord.RichEmbed()
			.setColor(client.color)
			.addField(`Membro`, `${user.tag} (${user.id})`, true)
			.addField(`Moderador`, `${message.author.tag} (${message.author.id})`, true)
			.addField(`Motivo`, `${reason}`, true);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Eu não tenho as permissões corretas.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      message.channel.send(`Usuário desmutado ${message.author.tag} (${message.author.id}) pelo motivo: \`${reason}\``);
      var unmuteEmbed = embed.setTitle('Usuário desmutado');
      modlog.send({embed: unmuteEmbed}).catch(console.error);
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      message.channel.send(embed);
      var muteEmbed = embed.setTitle('Usuário Mutado');
      modlog.send({embed: muteEmbed}).catch(console.error);
    });
  }

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['mute', 'mutar', 'unmute', 'desmutar'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Mute',
    category: '🛃 Moderação',
    description: 'DESCRIÇÃO',
    usage: 'r!mute @user 10s'
};