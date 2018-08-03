const { version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var time = Date.now();
	const embed = new Discord.RichEmbed()
		.setColor(client.color)
		.setTitle('Paleta de Cores')
    .addField('<:discordlogo:454695663620587541> **Discord:**', 'ㅤ')
		.addField(`Azoxo `, `#7289DA  <:Azoxo:454695663284912140>`, true)
		.addField(`Totalmente Branco`, `#FFFFFF  <:Totalmentebranco:454695663847079936>`)
		.addField(`Cinxo`, `#99AAB5  <:Cunxo:454695663389769729>`, true)
		.addField(`Escuro, mas não preto`, `#2C2F33  <:Escuromasnopreto:454695663754674177>`)
		.addField(`Não tão preto`, `#23272A  <:Notopreto:454695663851012116>`)
    .addField('ㅤ', 'ㅤ')
    .addField('**WebSite:**', 'ㅤ')
    .addField('Barra de Navegação', '#375A7F <:barra:454699477593489409>')
    .addField('Texto Destacado', '#009D54 <:textoVerde:454699477844885514>')
		.setFooter(`Ping: ${Date.now() - time}ms`);
 message.channel.send({embed});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['cores',  'cor'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Cores',
	category: '💈 Utilitários',
	description: 'Informa algumas cores bases do Discord e do Design do Site',
	usage: 'r!cores'
};