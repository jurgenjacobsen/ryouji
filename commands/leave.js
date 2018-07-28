exports.run = async (client, message, args) => { 

  const channel= message.member.voiceChannel;

if(!channel) {
 message.reply('Você deve estar em um canal')
}
  channel.leave()
    .catch(console.error);

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['exit', 'leave', 'sair'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Leave',
    category: '🎵 Música',
    description: 'Sai do canal que você',
    usage: 'r!leave'
};