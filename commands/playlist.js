const Discord = require('discord.js');

exports.run = async (client, message, args) => { 
 message.reply('https://www.youtube.com/playlist?list=PL-xE7I2OHOAgarR4ANbhqoi-6iF-Bwqsz')
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['playlist'],
    permLevel: 0,
};

exports.help = {
    name: 'Playlist',
    category: '🎵 Música',
    description: 'Mostra uma playlist de música do Youtube feita por Eleven',
    usage: 'r!playlist'
};