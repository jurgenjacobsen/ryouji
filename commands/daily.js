const db = require('quick.db');
const Discord = require('discord.js');
const ms = require('ms');
const c = require('currency-formatter');

exports.run = async (client, message, args) => {

	let cooldown = 8.64e+7;
	const amount = 250


	const VIPS = ['292065674338107393'];

	let valor;

	if (message.author.id == VIPS) {
		valor = 350;
	} else {
		valor = 250
	};

	let lastDaily = await db.fetch(`lastDaily_${message.author.id}`)
	try {
		db.fetch(`userBalance_${message.author.id}`).then(bucks => {
			if (bucks == null) {
				db.set(`userBalance_${message.author.id}`, 50)
			} else if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
				let timeObj = ms(cooldown - (Date.now() - lastDaily))

				let lastDailyEmbed = new Discord.RichEmbed()
					.setAuthor(`Próxima Diária`)
					.setColor('#23272A')
					.setDescription(`Você coletou já coletou seu **Daily**, você deve esperar para coletar no dia seguinte.`)
					.setFooter('Requested By ' + message.author.tag, message.author.avatarURL)
				message.channel.send(lastDailyEmbed)
			} else {
				db.set(`lastDaily_${message.author.id}`, Date.now());
				db.add(`userBalance_${message.author.id}`, valor).then(i => {
					var discord = require('discord.js')
					var embed = new Discord.RichEmbed()
						.setTitle('Diária de Hoje')
						.setDescription(`Você coletou sua diária com sucesso! :dollar:**${c.format(valor, { code: 'BRL' })}**`)
						.setColor('#23272A')
						.setFooter('Requested By ' + message.author.tag, message.author.avatarURL)
					message.channel.send(embed);
				})
			}
		})
	} catch (err) {
		console.log(err)
	}

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['daily', 'diaria', 'diário'],
	permLevel: 0
};

exports.help = {
	name: 'Daily',
	category: '💳 Econômia',
	description: 'Pegue sua diária para acrescentar dinheiro a sua conta',
	usage: 'r!daily'
};