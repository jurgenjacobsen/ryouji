
const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
    if (client.config.musicEnabled !== 'true') return message.channel.send('Comandos de música desativados');
    const serverQueue = client.musicQueue.get(message.guild.id);
    if (!serverQueue) return message.channel.send('Não há nada tocando.');
    const ytdl = require('ytdl-core');
    const id = serverQueue.songs[0].id; 
    ytdl.getInfo(id, (err, info) => {
    let embed = new Discord.RichEmbed()
        .setColor('#23272A')
        .setTitle('Tocando Agora')
        .setURL(info.video_url)
        .setDescription(serverQueue.songs[0].title)
        .setThumbnail(info.thumbnail_url)
        .setFooter(info.author.name, info.author.avatar)
    return message.channel.send(embed)
   });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['nowplaying', 'np'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'NowPlaying',
    category: '🎵 Música',
    description: 'Verifique qual música está tocando',
    usage: 'r!np'
};
