const db = require('quick.db')
const Discord = require('discord.js')
const currencyFormatter = require('currency-formatter');

exports.run = async (client, message, args) => {

var user = message.mentions.users.first() || message.author;
        
        var balance = await db.fetch(`userBalance_${user.id}`)
        
        if (balance === null) balance = 50;
        
        var embed = new Discord.RichEmbed()
        .setTitle(':credit_card: Conta')
        .setDescription(`${user.username}, tem em sua conta: **:dollar: ${currencyFormatter.format(balance, { code: 'BRL' })}**`)
        .setColor('#23272A')
        .setFooter('Requested By ' + message.author.tag, message.author.avatarURL)
        message.channel.send(embed)

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['banco', 'conta'],
	permLevel: 0
};

exports.help = {
	name: 'Banco',
	category: '💳 Econômia',
	description: 'Mostra quantos coins você possui',
	usage: 'r!banco [@user]'
};
