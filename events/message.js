module.exports = async (client, message) => {
	const Discord = require('discord.js')
	const db = require('quick.db');


let textinho = "Oie";

if(message.content.includes("<@"+ client.user.id + ">") && message.content.includes(textinho)) {
  message.reply('Falata tu, Bro!!! 777')
}

	if (message.author.bot) return;

	const settings = client.config.defaultSettings;

	const args = message.content.split(/\s+/g);
	var command;

const EmbedBlackList = new Discord.RichEmbed()
.setTitle('Você está na BlackList!')
.setAuthor('', message.author.avatarURL)
.setColor(client.color)
.setDescription('Você não tem permissão alguma de executar algum comando do bot, por motivos que, <@'+client.config.ownerID+'> adicionou você na **BlackList**')

if(message.guild.id !== '425864977996578816' || message.guild.id !== '264445053596991498') {
   if(message.content.startsWith('MEUPAL PPOONTO OIJOSHDOINBSIKBIUBUIBYUHBAQSYHUBAHUBDSHJ')) return message.channel.send(message.author, EmbedBlackList);
};

	message.settings = settings;

 const prefix = 'r!';

	command = args.shift().slice(prefix.length)
		.toLowerCase();
  
	const level = client.permlevel(message);

	const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

	if (message.channel.type === 'dm') {
		if (!cmd) return;
		if (cmd.conf.guildOnly) return message.channel.send('Este comando está desativado em DMs');
	}

	if (message.channel.type !== 'dm') {
     const guild = message.guild;
		const guildSettings = client.config.defaultSettings;
db.fetch(`guildSettings_${guild.id}_inviteFilter`).then(config => {
		if (message.content.match(/(discord\.(gg|me|io)|(discordapp\.com|discord\.com)\/invite).*/) && config == 'true' || message.content.match(/(discord\.(gg|me|io)|(discordapp\.com|discord\.com)\/invite).*/) && config == null) {
			var msgInv = message.content.match(/discord\.gg\/[0-9A-Za-z-]+/);

			if (!msgInv) return;
			var dggInvCode = msgInv[0].replace(/discord\.gg\//, '');

			if (level >= 2 || message.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS') || message.member.hasPermission('MANAGE_NICKNAMES')  || message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('ADMINISTRATOR') ) {
				return console.log(`${message.author.tag} (${message.author.id}) ${level}`);
			}
			message.delete();
			message.reply('Convites não são permitidos neste servidor');
		}
});
    
		if (message.content.indexOf(client.config.prefix) !== 0) {
			return;
		}

			client.talkedRecently.add(message.author.id);
			setTimeout(() => {
				client.talkedRecently.delete(message.author.id);
			}, parseInt(guildSettings.commandTimeout));

		if (guildSettings.logCommandUsage === 'true') {
			if (cmd) {
				if (level >= cmd.conf.permLevel) {
					if (cmd.conf.enabled === true) {
						cmd.run(client, message, args, level);
						 console.log(`${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) Executou o comando ${message.content}`);
					} else {
						message.reply('Este comando está desligado');
						console.log(`${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) Executou o comando desligado ${message.content}`);
					}
				} else {
					message.reply('Você não tem permissão para isso!')
					console.log(`${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) Executou o comando ${message.content} sem ter o nível de permissão`);
				}
			} else {
				console.log(`${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) tentou executar um comando enexistente ${message.content}`);
				message.reply('Este comando não existe, dê **r!ajuda** para ver meus comandos');
			}
		} else {
			cmd.run(client, message, args, level);
		}
	} else if (cmd) {
		if (level >= cmd.conf.permLevel) {
			if (cmd.conf.enabled) {
				cmd.run(client, message, args, level);
				if (client.config.defaultSettings.logCommandUsage === 'true') {
					console.log(`DM: ${message.author.username} (${message.author.id}) Executou o comando ${message.content}`);
				}
			} else if (client.config.defaultSettings.logCommandUsage === 'true') {
				console.log(`DM: ${message.author.username} (${message.author.id}) Executou o comando desligado ${message.content}`);
        message.reply('Este comando está desligado')
			}
		} else if (client.config.defaultSettings.logCommandUsage === 'true') {
			console.log(`DM: ${message.author.username} (${message.author.id}) Executou o comando ${message.content} sem ter o nível de permissão`);
			message.reply('Você não tem permissão para isso!')
		}
	}
};