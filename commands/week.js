const db = require('quick.db');
const Discord = require('discord.js');
const ms = require('ms');
const c = require('currency-formatter');

exports.run = async (client, message, args) => {

	let cooldown = 604800000;

	let valor;

	if (message.author) {
		valor = 750;
	}

	let lastWeek = await db.fetch(`lastWeek_${message.author.id}`)
	try {
		db.fetch(`userBalance_${message.author.id}`).then(bucks => {
			if (bucks == null) {
				db.set(`userBalance_${message.author.id}`, 50)
			} else if (lastWeek !== null && cooldown - (Date.now() - lastWeek) > 0) {
				let timeObj = ms(cooldown - (Date.now() - lastWeek))

				let lastDailyEmbed = new Discord.RichEmbed()
					.setAuthor(`Pacotão Semanal`)
					.setColor('#23272A')
					.setDescription(`Você coletou já coletou seu **Pacotão Semanal**, você deve esperar para coletar na semana seguinte`)
					.setFooter('Requested By ' + message.author.tag, message.author.avatarURL)
				message.channel.send(lastDailyEmbed)
			} else {
				db.set(`lastWeek_${message.author.id}`, Date.now());
				db.add(`userBalance_${message.author.id}`, valor).then(i => {
					var discord = require('discord.js')
					var embed = new Discord.RichEmbed()
						.setTitle('Pacotão Semanal')
						.setDescription(`Você coletou seu dinheiro semanal! :dollar:**${c.format(valor, { code: 'BRL' })}**`)
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
	aliases: ['semanal', 'week'],
	permLevel: 0
};

exports.help = {
	name: 'Week',
	category: '💳 Econômia',
	description: 'Pegue uma quantia em dinheiro todas as semanas',
	usage: 'r!week'
};