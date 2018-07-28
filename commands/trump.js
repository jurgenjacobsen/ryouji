const Discord = require('discord.js');
const Jimp = require('jimp');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

    let meow = message.content.split(" ").slice(1);
    let args1 = meow.join(' ');
    let illegal = `https://storage.googleapis.com/is-now-illegal.appspot.com/gifs/` + args1.toUpperCase() + `.gif`;
    if (!args1) {
        return message.reply(':x: **Por favor diga uma coisa ilegal**');
    }
    if (meow.length > 1) {
        return message.reply(':x: **Max 1 Palavra**');
    }
    const emb = new Discord.RichEmbed();
    emb.setAuthor("Trump está fazendo " + meow + " se tornar ilegal!", "http://blog.adsy.me/wp-content/uploads/2016/11/angry-side-face-trump-transparent.png");
    emb.setImage(illegal);
    message.channel.send({
        embed: emb
    })

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['trump'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Trump',
	category: '🎉 Diversão',
	description: 'Mostra uma coisa ilgeal',
	usage: 'r!trump [palavra]'
};
