const Discord = require('discord.js')
function clean(text) {if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)); else return text;};   


exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

const msg = message;
const db = require('quick.db');

if(message.author.id == '459433637188993025') return;
  
const tokenn = 'token'; if(message.content.match(tokenn)) return message.delete().then(msg => msg.reply('Eu não gosto que os outros vejam meu token'));
const configsf = 'config'; if(message.content.match(configsf)) return message.delete().then(msg => msg.reply('Eu não gosto que os outros vejam minhas configs'));
const sessionsecrets = 'sessionsecret'; if(message.content.match(sessionsecrets)) return message.delete().then(msg => msg.reply('Eu não gosto que os outros vejam meu Sessionssecret'));
const oauthSecrets = 'oauthSecret'; if(message.content.match(oauthSecrets)) return message.delete().then(msg => msg.reply('Eu não gosto que os outros vejam meu oAuthSecret'));
const dashboardz = 'dashboard'; if(message.content.match(dashboardz)) return message.delete().then(msg => msg.reply('Eu não gosto que os outros vejam meu dashboard configs'));

    try {
      const code = args.join(" ");
      let evaled = eval(code) 
      if(!code)return msg.reply('Digite um código')
      if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);      
      const embed = new Discord.RichEmbed()
      .setTitle("<:yep:416325498130399234> Executado!")
      .setColor(client.color)
      .addField(`:inbox_tray: Input`, '```' + (code) + '```')
      .addField(`:outbox_tray: Output:`, '```' + clean(evaled) + '```')
      msg.channel.send({embed})
      msg.channel.send({code:"xl"});
    } catch (err) {
      var code = args.join(' ')
      const embed = new Discord.RichEmbed()
      .setTitle("<:nop:416325498231324682> Error")
      .setColor("#ff0000")
      .addField(`:inbox_tray: Input`, '```' + (code) + '```')
      .addField(`:outbox_tray: Output:`, '```' + clean(err) + '```')
      msg.channel.send({embed})
    }

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['eval', 'exec', 'executar'],
	permLevel: 10,
  manu: false
};

exports.help = {
	name: 'Eval',
	category: '🔧 Sistema',
	description: 'Executar um código Java',
	usage: 'r!eval [código]'
};
