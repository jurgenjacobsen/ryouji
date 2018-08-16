const Discord = require('discord.js')
exports.run = async (client, message, args, level) => {
	var question = args.join(' ');
	var answers = client.config.eightBallResponses;
	if (!question) return message.reply('Isso não parece uma pergunta.').then(msg => msg.delete(5000))
	var a = Math.floor(Math.random() * answers.length);

	let ballembed = new Discord.RichEmbed()
	.setAuthor(client.user.username, client.user.displayAvatarURL)
	.setColor(client.color)
	.addField("Pergunta", question)
	.addField("Resposta", answers[a])
	.setFooter(`Pedido por ${message.author.tag}`);
  
	message.channel.send(ballembed);

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: '8ball',
	category: '🎉 Diversão',
	description: 'Responde a uma pergunta',
	usage: 'r!8ball [pergunta]'
};
