const Discord = require('discord.js');
const ms = require('ms');

exports.run = async (client, message, args) => { 

 let warns = client.warns;
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Você não tem permissão para isso!");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
   
     if(!wUser) return message.reply("Não encontrei ninguém!");

     let reason = args.join(" ").slice(22);

      if(!warns[wUser.id]) warns[wUser.id] = {
         warns: 0
      };

      warns[wUser.id].warns++;

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Avisos")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Usuário Avisado:", `<@${wUser.id}>`)
  .addField("Avisado em", message.channel)
  .addField("Número de Avisos", warns[wUser.id].warns)
  .addField("Motivo", reason);

  message.channel.send(message.author, warnEmbed);

  if(warns[wUser.id].warns == 3){
    let muterole = message.guild.roles.find(`name`, "Mutado");
    if(!muterole) return message.reply("Este servidor deve ter o cargo chamado **Mutado**");

    let mutetime = "15m";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> foi temporariamente mutado por **15 Minutos**`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> foi desmutado com sucesso!`)
    }, ms(mutetime))
  }
  
  if(warns[wUser.id].warns == 5){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> foi banido!`)
  }


};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['VARIÁVEIS'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Warn',
    category: '🛃 Moderação',
    description: 'Avisa um usuário',
    usage: 'r!warn @user [Motivo]'
};