const Discord = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    let user;

    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    const scorePoints = client.points.get(`${message.guild.id}-${user.id}`).points || 0;
    let embed = new Discord.RichEmbed()
        .setColor(client.color)
        .setAuthor(user.username + ' possui ' + scorePoints + ' pontos')
        .setFooter(client.user.username, client.user.avatarURL) 
	!scorePoints ? message.channel.send('Você não tem pontos ainda.') : message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['pontos', 'points'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Pontos',
    category: '🎉 Diversão',
    description: 'Bom, você pode quantos comando você possui',
    usage: 'r!pontos'
};