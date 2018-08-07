module.exports = async (client, message) => {
	const Discord = require('discord.js')
	const db = require('quick.db');

	let status = new db.table('AFKs');
	let afk = status;

	let authorStatus = await status.fetch(message.author.id);

	if (authorStatus) {

		const embed = new Discord.RichEmbed()
			.setColor(0xffffff)
			.setFooter(`${message.author.username} não está mais AFK.`)

		message.channel.send(embed).then(i => i.delete(10000))

		afk.delete(message.author.id);

	}

	if (message.channel.type !== 'dm') {
		let mentioned = message.mentions.members.first();
		if (mentioned) {

			let status = await afk.fetch(mentioned.id);

			if (status) {

				message.delete(10000)
				const embed = new Discord.RichEmbed()
					.setColor(0xffffff)
					.setFooter(status);

				message.channel.send(embed).then(msg => msg.delete(8000))

			}
		}
	}

let textinho = "Oie";

if(message.content.includes("<@"+ client.user.id + ">") && message.content.includes(textinho)) {
  message.reply('Falata tu, Bro!!! 777')
}

	if (message.author.bot) {
		return;
	}

	const settings = client.config.defaultSettings;

	const args = message.content.split(/\s+/g);
	var command;

const EmbedBlackList = new Discord.RichEmbed()
.setTitle('Você está na BlackList!')
.setAuthor('', message.author.avatarURL)
.setColor(client.color)
.setDescription('Você não tem permissão alguma de executar algum comando do bot, por motivos que, <@'+client.config.ownerID+'> adicionou você na **BlackList**')

if(message.guild.id !== '425864977996578816' || message.guild.id !== '264445053596991498') {
   if(message.author.id == '247362229031272449') return message.channel.send(message.author, EmbedBlackList);
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
		const guildSettings = client.config.defaultSettings;

		if (message.content.match(/(discord\.(gg|me|io)|(discordapp\.com|discord\.com)\/invite).*/) && guildSettings.inviteFilterEnabled === 'true') {

			var msgInv = message.content.match(/discord\.gg\/[0-9A-Za-z-]+/);

			if (!msgInv) return;
			var dggInvCode = msgInv[0].replace(/discord\.gg\//, '');


			var whitelist = guildSettings.inviteWhitelist;

			if (whitelist.includes(dggInvCode)) return;
			if (level >= 2 || message.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS') || message.member.hasPermission('MANAGE_NICKNAMES')  || message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('ADMINISTRATOR') ) {
				return console.log(`${message.author.tag} (${message.author.id}) bypassed the invite link filter due to having a level of ${level}`);
			}
			message.delete();
			message.reply('Convites não são permitidos neste servidor');
		}

		if (guildSettings.swearFilter === 'true' && guildSettings.swearWords.some(word => message.content.includes(word))) {
			message.delete();
			message.reply('Não fale palavrões!');
		}

		if (message.content.indexOf(guildSettings.prefix) !== 0) {
			return;
		}

		if (level < 2) {
			client.talkedRecently.add(message.author.id);
			setTimeout(() => {
				// Removes the user from the set after 2.5 seconds
				client.talkedRecently.delete(message.author.id);
			}, parseInt(guildSettings.commandTimeout));
		}

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