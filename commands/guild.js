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
   if(message.author.id == message.guild.owner.id) {
      switch (args[1]) {
        case "welcome" : {
             const canal = message.guild.channels.get(args[2])
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
             const canal = message.guild.channels.get(args[2])
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
             const canal = message.guild.channels.get(args[2])
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