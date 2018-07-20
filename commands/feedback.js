exports.run = async (client, message, args) => { 
 switch (args[0]) {  
  case 'send': {
    const Discord = require('discord.js');
    const db = require('quick.db');
    const amount = 50;
    db.add(`userBalance_${message.author.id}`, amount)
    const Embed = new Discord.RichEmbed()
    .setTitle('<:green:463073006093336576> FeedBack Enviado !')
    .setColor('#23272A')
    .setDescription('Sua mensagem de feedback foi enviada com sucesso! Já que você está me ajudando com sua mensagem de feedback estou lhe dando **R$50,00**')
    .setTimestamp()
    .setFooter('Lembrando que se você spammar este comando com a intenção de ganhar dinheiro você será punido!', client.user.avatarURL);
    message.channel.send(Embed)

    const sEmbed = new Discord.RichEmbed()
    .setTitle('User: ' + message.author.username)
    .setColor('#23272A')
    .setDescription(args[1])
    .setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL)
    const channel = client.channels.get('468594600039415828').send(sEmbed)
    break;
  }
 };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['feedback'],
    permLevel: 0
};

exports.help = {
    name: 'Feedback',
    category: '💈 Utilitários',
    description: 'Envia uma mensagem de feedback ao meu dono',
    usage: 'r!feedback send [texto]'
};