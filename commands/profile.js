exports.run = async (client, message, args) => { 
 let user;

    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if(args[0]) {
        user = client.users.get(args[0]);
    } else {
        user = message.author;
    }

    const Discord = require('discord.js');
    const profileEmbed = new Discord.RichEmbed()
    .setTitle('Perfil de **' + user.username + '**')
    .setDescription(`Link: **https://ryouji.glitch.me/user/${user.id}**`)
    .setThumbnail(user.avatarURL + '?size=512')
    .setColor('#23272A')
    message.channel.send(profileEmbed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['profile', 'perfil'],
    permLevel: 0
};

exports.help = {
    name: 'Profile',
    category: '💈 Utilitários',
    description: 'Mostra o perfil do usuário',
    usage: 'r!profile'
};