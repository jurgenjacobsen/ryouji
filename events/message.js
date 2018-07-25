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

	if (message.author.bot) {
		return;
	}

	client.pointsMonitor(client, message);


	const settings = client.config.defaultSettings;

	const args = message.content.split(/\s+/g);
	var command;


	message.settings = settings;

	command = args.shift().slice(settings.prefix.length)
		.toLowerCase();

	const level = client.permlevel(message);

	const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

	if (message.channel.type === 'dm') {
		if (!cmd) return;
		if (cmd.conf.guildOnly) return message.channel.send('Este comando está desativado em DMs');
	}

	if (message.channel.type !== 'dm') {
		const guildSettings = client.settings.get(message.guild.id);

		if (message.content.match(/(discord\.(gg|me|io)|(discordapp\.com|discord\.com)\/invite).*/) && guildSettings.inviteFilterEnabled === 'true' && message.guild
			.id !== '351137100722208768') {

			var msgInv = message.content.match(/discord\.gg\/[0-9A-Za-z-]+/);

			if (!msgInv) return;
			var dggInvCode = msgInv[0].replace(/discord\.gg\//, '');


			var whitelist = guildSettings.inviteWhitelist;

			if (whitelist.includes(dggInvCode)) return;
			if (level >= 2) {
				return console.log(`${message.author.tag} (${message.author.id}) bypassed the invite link filter due to having a level of ${level}`);
			}
			message.delete();
			message.reply('Convites não são permitidos neste servidor');
		}

		if (guildSettings.swearFilter === 'true' && guildSettings.swearWords.some(word => message.content.includes(word))) {
			message.delete();
			message.reply('Não fale palavrões!');
		}

		if (guildSettings.facepalms === 'true' && (message.content.toLowerCase()
				.indexOf('facepalm') !== -1 || message.content.indexOf('🤦') !== -1)) {
			message.channel.send(':face_palm:');
		}

		if (message.content.indexOf(guildSettings.prefix) !== 0) {
			return;
		}

		if (client.talkedRecently.has(message.author.id)) {
			return message.reply(`Você precisa esperar ${parseInt(guildSettings.commandTimeout)}ms segundos para executar cada comando.`).then(msg => msg.delete({
				timeout: 4000
			}))
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
						console.log('[LOG]',
							`${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) Executou o comando ${message.content}`,
							'CMD');
					} else {
						message.reply('Este comando está desligado');
						client.log('[LOG]',
							`${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) Executou o comando desligado ${message.content}`,
							'CMD');
					}
				} else {
					message.reply('Você não tem permissão para isso!')
					client.log('[LOG]',
						`${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) Executou o comando ${message.content} sem ter o nível de permissão`,
						'CMD');
				}
			} else {
				client.log('[LOG]',
					`${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) tentou executar um comando enexistente ${message.content}`,
					'CMD');
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
					client.log('[LOG]', `DM: ${message.author.username} (${message.author.id}) Executou o comando ${message.content}`, 'CMD');
				}
			} else if (client.config.defaultSettings.logCommandUsage === 'true') {
				client.log('[LOG]', `DM: ${message.author.username} (${message.author.id}) Executou o comando desligado ${message.content}`, 'CMD');
			}
		} else if (client.config.defaultSettings.logCommandUsage === 'true') {
			client.log('[LOG]', `DM: ${message.author.username} (${message.author.id}) Executou o comando ${message.content} sem ter o nível de permissão`, 'CMD');
			message.reply('Você não tem permissão para isso!')
		}
	}


	const canal = client.channels.get('465654523176943618');

	const logOwnEmbed = new Discord.RichEmbed()
		.setTitle('Comando Executado')
		.setColor('#23272A')
		.addField('Autor', message.author)
		.addField('ID da Mensagem', message.id)
		.setAuthor(message.author.username, message.author.avatarURL)

	if (message.channel.type !== 'dm') {
		logOwnEmbed.addField('Servidor', message.guild.name).addField('ID do Servidor', message.guild.id)
	}

	canal.send(logOwnEmbed)
};