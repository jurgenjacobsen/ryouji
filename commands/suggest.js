const Discord = require("discord.js");

exports.run = async (client, message, args) => { 
 let suggestmessage = args.join(" ");
 let suggestchannel = client.channels.get('470351855218851840')

 if (!suggestmessage) {
    return message.reply("Por favor dê uma sugestão para mim!")
 }

 let embed = new Discord.RichEmbed()
     .setColor('#2C2F33')
     .addField("**Sugestão**", `${suggestmessage}`)
     .setFooter(`Sugerido por ${message.author.tag}`)
     .setTimestamp()
 suggestchannel.send({
        embed
    }).then(msg => {
        msg.react("✅").then(r => msg.react("❎"))
    });

 message.reply(`Sua sugestão foi enviada!`);

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sugestão', 'suggest', 'suggestion'],
    permLevel: 0
};

exports.help = {
    name: 'Sugestão',
    category: '💈 Utilitários',
    description: 'Envia uma sugestão para talvez poder ser adicionada a mim.',
    usage: 'r!sugestão [texto]'
};