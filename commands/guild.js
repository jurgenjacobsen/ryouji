exports.run = async (client, message, args) => { 
 const msg = message;
 const Discord = require('discord.js');
 const db = require('quick.db');
 const send = require('quick.hook');
 const c = require('currency-formatter');
  
  let bank = await db.fetch(`guildBank_${msg.guild.id}`);

  

 const itens = {
  "Plano_Mensal": {
     price: "12500",
     description: ""
   }

 };
if(msg.guild) {

switch (args[0]) {
  case "ping" : {
    message.channel.send(`Ping: **${Date.now() - message.createdTimestamp}**ms `);
    break;
  }

  case "account" : {
    const Embed = new Discord.RichEmbed()
    .setTitle('Account')
    .setColor(client.color)
    .setAuthor(`Dono: ${msg.guild.owner.user.tag}`, msg.guild.owner.avatarURL)
    .setThumbnail(`${msg.guild.iconURL}?size=512`)
    .addField('Banco do Servidor: ', `:dollar: **${c.format(bank, { code: 'BRL' })}**`)
    .setFooter(msg.guild.name)

    msg.channel.send(Embed)
    break;
   }
    
  case "set" : {
   if(message.author.id == message.guild.owner.id || message.author.id == client.config.ownerID) {
      switch (args[1]) {
        case "welcome" : {
             const canal = message.guild.channels.get(args[2]) || message.mentions.channels.first();
             if(!canal) return message.reply('Não foi possível obter este canal');

             db.set(`guildSettings_${message.guild.id}_welcomeChannel_`, canal.id)

             const Embed = new Discord.RichEmbed()
                   .setTitle('<:green:463073006093336576> Setado com Sucesso!')
                   .setColor(client.color)
                   .setDescription(`O canal de **Boas Vindas** foi setado como: <#${canal.id}>`)
             message.channel.send(message.author, Embed)  
        }
        break;
        case "bye" : {
             const canal = message.guild.channels.get(args[2]) || message.mentions.channels.first();
             if(!canal) return message.reply('Não foi possível obter este canal');

             db.set(`guildSettings_${message.guild.id}_byeChannel_`, canal.id)

             const Embed = new Discord.RichEmbed()
                   .setTitle('<:green:463073006093336576> Setado com Sucesso!')
                   .setColor(client.color)
                   .setDescription(`O canal de **Despedidas** foi setado como: <#${canal.id}>`)
             message.channel.send(message.author, Embed)
        } 
        break;
        case "counter" : {
             const canal = message.guild.channels.get(args[2]) || message.mentions.channels.first();
             if(!canal) return message.reply('Não foi possível obter este canal')

             db.set(`guildSettings_${message.guild.id}_counter_`, canal.id)

 db.fetch(`guildSettings_${message.member.guild.id}_counter_`).then(counter => {
    const count = message.member.guild.members.size.toString();

    const e = count.replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:').replace('0', ":zero:").replace('1', ":one:").replace('2', ":two:").replace('3', ":three:").replace('4', ":four:").replace('5', ":five:").replace('6', ":six:").replace('7', ":seven:").replace('8', ":eight:").replace('9', ':nine:')

      message.member.guild.channels.get(counter).setTopic(`${e} Membros`)

});

             const Embed = new Discord.RichEmbed()
                   .setTitle('<:green:463073006093336576> Setado com Sucesso!')
                   .setColor(client.color)
                   .setDescription(`O tópico de **Contagem de Membros** foi setado em <#${canal.id}>`)
              message.channel.send(message.author, Embed)
        }
        break;
        case "auto-role" : {
         let role = message.guild.roles.find("name", args[2]) || message.mentions.roles.first();
         db.set(`guildSettings_${message.guild.id}_auto-role_`, role.id)

             const Embed = new Discord.RichEmbed()
                   .setTitle('<:green:463073006093336576> Setado com Sucesso!')
                   .setColor(client.color)
                   .setDescription(`O novo **Cargo Automático** foi setado como <@${role.id}>`)
              message.channel.send(message.author, Embed)
        }
        break;
        case "welcomeMessage" : {
          const helpEmbed = new Discord.RichEmbed()
          .setTitle('<:no:470363478843195412> Ajudinha pra você !?')
          .setColor(client.color)
          .setDescription(`Você pode usar **{{user}}** para exibir o nome de usuário e/ou **{{guild}}** para exibir o nome do servidor.`)
          let text = args[2] &&  args[3] && args[4] && args[5] && args[6] && args[7] && args[8] && args[9] && args[10] && args[11] && args[12] && args[13] && args[14] && args[15] && args[16] && args[17] && args[18] && args[19] && args[20] && args[21] && args[22] && args[23] && args[24] && args[25] && args[26] && args[27] && args[28] && args[29] && args[30] && args[32] && args[33] && args[34] && args[35] && args[36];
          if(!text) return msg.channel.send(msg.author, helpEmbed);
          
          db.set(`guildSettings_${msg.guild.id}_welcomeMessage_`, text)
          const Embed = new Discord.RichEmbed()
          .setTitle('<:green:463073006093336576> Setado com Sucesso!')
          .setColor(client.color)
          .setDescription(`Você setou a mensagem de **Bem-Vindo** como: "${text}"`)
          message.channel.send(message.author, Embed)
        } break;
     }
     
   } else {
       message.reply('Você deve ser o dono para alterar isso!')
   }

  }
  break;

  case "daily" : {
   if(!message.author.id == client.config.ownerID) {
      message.reply('Somente o <@' + client.config.ownerID + '> tem acesso à esse comando')
   } else {
    const amount = 50;

    message.guild.members.forEach(user => {
    db.fetch(`userBalance2.0_${message.author.id}`).then(bucks => {
			if (bucks == null) {
				db.set(`userBalance2.0_${user.id}`, 50)
			} else { 
      db.add(`userBalance2.0_${user.id}`, amount)
      };
    });
   });

   const Embed = new Discord.RichEmbed()
   .setTitle('<:green:463073006093336576> Daily para Todos os Membros!')
   .setColor(client.color)
   .setDescription(`Foram adicionados **50** coins na conta de todos os membros deste servidor!`)
   message.channel.send(message.author, Embed)
   }
  } 
  break;
  case "reset" : {
  if(!message.author.id == client.config.ownerID) {
     message.reply('Somente o <@' + client.config.ownerID + '> tem acesso à esse comando')
  } else {
    db.set(`guildSettings_${message.guild.id}_counter_`, null)
    db.set(`guildSettings_${message.guild.id}_byeChannel_`, null)
    db.set(`guildSettings_${message.guild.id}_welcomeChannel_`, null)
    const Embed = new Discord.RichEmbed()
    .setTitle('<:green:463073006093336576> Todas as opções foram resetadas')
    .setColor(client.color)
    message.channel.send(message.author, Embed)
  }


  } break;

  }
  
} else {
 msg.reply('Você deve estar em um servidor!')
}
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['guild', 'guild'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Server',
    category: '🔨 Desenvolvimento',
    description: 'Configura alguns opções do servidor, como o canal de bem-vindo, despedidas...',
    usage: 'r!guild'
};