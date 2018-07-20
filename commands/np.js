
const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
    if (client.config.musicEnabled !== 'true') return message.channel.send('Comandos de música desativados');
    const serverQueue = client.musicQueue.get(message.guild.id);
    if (!serverQueue) return message.channel.send('Não há nada tocando.');
    let embed = new Discord.RichEmbed()
        .setColor('#23272A')
        .setTitle('Tocando Agora')
        .setDescription(serverQueue.songs[0].title)
        .setThumbnail(serverQueue.songs[0].thumbnail)
        .setFooter(client.user.username, client.user.avatarURL)
    return message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['nowplaying', 'np'],
    permLevel: 0
};

exports.help = {
    name: 'NowPlaying',
    category: '🎵 Música',
    description: 'Verifique qual música está tocando',
    usage: 'r!np'
};
