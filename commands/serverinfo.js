const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
	const moment = require('moment')
	moment.locale('pt-br')
	const msg = message;
	var time = Date.now();
	if (!message.guild.available) return;
	moment.locale('pt-br');

	let guild;

	if (args[0]) {
		guild = client.guilds.get(args[0]);
	} else {
		guild = message.guild;
	}

	let serverRegion = {
		'amsterdam': ':flag_nl: Amsterdã',
		'brazil': ':flag_br: Brasil',
		'eu-central': ':flag_eu: Europa Central',
		'eu-west': ':flag_eu: Europa Ocidental',
		'frankfurt': ':flag_de: Frankfurt',
		'hongkong': ':flag_hk: Hong Kong',
		'japan': ':flag_jp: Japão',
		'london': ':flag_gb: Londres',
		'russia': ':flag_ru: Russia',
		'singapore': ':flag_sg: Singapura',
		'sydney': ':flag_au: Sydney',
		'us-central': ':flag_us: EUA Central',
		'us-east': ':flag_us: EUA Oriental',
		'us-west': ':flag_us: EUA Ocidental',
		'us-south': ':flag_us: EUA Sul',
	}[guild.region];

	const invite = await msg.channel.createInvite({
		maxAge: 0
	});
	const embed = new Discord.RichEmbed()
		.setTitle(`ㅤ`)
		.setAuthor(`${guild.name}`,
			'https://images-ext-1.discordapp.net/external/rXMwUDg4JWQ30e0YkTQkF2Fvf2KhlG2RdzyKztO4COA/https/cdn.discordapp.com/emojis/452852445001941002.png')
		.setColor('#23272A')
		.setThumbnail(`${guild.iconURL}?size=512`)
		.addField(`ID do Servidor`, `${guild.id}`, true)
		.addField(`:crown: Dono`, `${guild.owner}`, true)
		.addField(":calendar: Criado em:", `${moment.utc(guild.createdAt).format('LLLL')}`, true)
		.addField(":star2: Entrei em:", moment.utc(client.user.joinedAt).format('LLLL'), true)
		.addField(`Membros: (${guild.memberCount})`,
			`:busts_in_silhouette: Pessoas: ${guild.members.filter(member => !member.user.bot).size} | <:bot:454695663742222348> Bots: ${guild.members.filter(member => member.user.bot).size} \n<:online:454695663549022220> **${guild.members.filter(o => o.presence.status === 'online').size}** Online <:idle:454695663532507157> **${guild.members.filter(i => i.presence.status === 'idle').size}** Ausente <:donotdisturb:454695663352152076> **${guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** Ocupado <:offline:454695663582576642> **${guild.members.filter(off => off.presence.status === 'offline').size}** Offline`
		)
		.addField('Região', `${serverRegion}`)
		.addField('Convite:', `${invite}`)
		.addField('Página:', `https://ryouji.glitch.me/servers/${guild.id}`)
	msg.channel.send({
		embed
	});

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['serverinfo'],
	permLevel: 0
};

exports.help = {
	name: 'ServerInfo',
	category: '💈 Utilitários',
	description: 'Irá dar-lhe informações sobre este servidor',
	usage: 'r!serverinfo'
};