const Discord = require("discord.js");
const superagent = require("superagent");

exports.run = async (client, message, args) => {

    let hugUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!hugUser) return message.channel.send("Certifique-se de mencionar alguém!");

    const {body} = await superagent
    .get(`https://nekos.life/api/v2/img/hug`);

    let hugEmbed = new Discord.RichEmbed()
    .setTitle("Abraço! <:EeveeSip:459132727397056512>")
    .setDescription(`**${message.author.username}** abraçou **${message.mentions.users.first().username}**!`)
    .setImage(body.url)
    .setColor("#23272A")

    message.channel.send(hugEmbed)

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['hug', 'abraço'],
    permLevel: 0
};

exports.help = {
    name: 'Abraço',
    category: '🎉 Diversão',
    description: 'Dê um abraço em alguém!',
    usage: 'r!abraço [@user]'
};