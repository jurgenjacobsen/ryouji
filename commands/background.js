exports.run = async (client, message, args) => {
 const msg = message; 
 const Discord = require('discord.js');
 const DB = require('quick.db');
 const send = require('quick.hook');

 DB.fetch(`userItems_${msg.author.id}_background1`).then(background => {
    if(background >= 1) {
       DB.fetch(`userBackground_${msg.author.id}`).then(item => {
        if(item == null) {
           if(!args[0]) {
            msg.reply('Se você quiser você adicionar um background à seu perfil escreva **r!background list**, para ver os backgrounds disponíves e em seguida adicionar um deles.');
           }
        } else {
           if(!args[0]) {
            msg.reply('Se você quiser você alterar seu background atual escreva **r!background list**, para ver os backgrounds disponíves e em seguida adicionar um deles.');
           }
        }
       })
    } else {
      msg.reply('Você deve obter o **Background** na loja para ter acesso à esse comando. Compre usando **r!comprar Background**')
    }

   
// ----------------// 
//    SETTINGS    //
// --------------//

switch (args[0]) {
  case "ping" : {
    message.channel.send('Pong!');
    break;
  }

  case "list" : {
    const Embed = new Discord.RichEmbed()
    .setTitle(':frame_photo: Lista de Backgrounds')
    .setColor(client.color)
    .addField('Azoxo', '<:Azoxo:454695663284912140> , **r!background set Azoxo**')
    .addField('Branco', '<:Totalmentebranco:454695663847079936>  **r!background set Branco**')
    .addField('Cinxo', '<:Cunxo:454695663389769729>  **r!background set Cinxo**')
    .addField('Cinza', '<:Escuromasnopreto:454695663754674177>  **r!background set Cinza**')
    .addField('Escuro', '<:Notopreto:454695663851012116>  **r!background set Escuro**')
    .addField('Rainbow', '<:rainbow2:472123064239259658> **r!background set Rainbow**')
    .addField('Flora', ':camping:  **r!background set Flora**')
    msg.channel.send(Embed)
    break;
  }

  case "reset" : {
     DB.set(`userBackground_${msg.author.id}`, null)
     const Embed = new Discord.RichEmbed()
     .setTitle('Seu Background foi resetado!')
     .setColor(client.config.cores.padrão)
     .setAuthor(msg.author.username, msg.author.avatarURL)
     msg.channel.send(Embed)
   break;
  }  


  case "set" : {
   if(!args[1]) {
     msg.reply('Dê **r!background list**, para saber todos os backgrounds que você pode adicionar ao seu perfil!')
   } else {
    switch (args[1]) {
      case "Azoxo" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setColor('#7289DA')
           .setDescription('Agora, você pode ver seu perfil em: https://ryouji.glitch.me/user/' + msg.author.id)
           msg.channel.send(Embed)
           DB.set(`userBackground_${msg.author.id}`, 'https://cdn.discordapp.com/attachments/470277456964747274/471389447447904276/Azoxo.png')
      break;
      }
   
      case "Branco" : {
            const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setColor('#FFFFFF')
           .setDescription('Agora, você pode ver seu perfil em: https://ryouji.glitch.me/user/' + msg.author.id)
           msg.channel.send(Embed)
           DB.set(`userBackground_${msg.author.id}`, 'https://media.discordapp.net/attachments/470277456964747274/471390225785159680/Totalmente_branco.png')
      break;
      }
      case "Cinxo" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setColor('#99AAB5')
           .setDescription('Agora, você pode ver seu perfil em: https://ryouji.glitch.me/user/' + msg.author.id)
           msg.channel.send(Embed)
           DB.set(`userBackground_${msg.author.id}`, 'https://media.discordapp.net/attachments/470277456964747274/471390922316316701/Cunxo.png')
      break;
      }
      case "Cinza" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setColor('#2C2F33')
           .setDescription('Agora, você pode ver seu perfil em: https://ryouji.glitch.me/user/' + msg.author.id)
           msg.channel.send(Embed)
           DB.set(`userBackground_${msg.author.id}`, 'https://cdn.discordapp.com/attachments/470277456964747274/471391400374566932/Escuro_mas_nao_preto.png')
      break;
      }
      case "Escuro" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setColor('#23272A')
           .setDescription('Agora, você pode ver seu perfil em: https://ryouji.glitch.me/user/' + msg.author.id)
           msg.channel.send(Embed)
           DB.set(`userBackground_${msg.author.id}`, 'https://cdn.discordapp.com/attachments/470277456964747274/471391511590993920/Nao_tao_preto.png')
      break;
      }
      case "Rainbow" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setDescription('Agora, você pode ver seu perfil em: https://ryouji.glitch.me/user/' + msg.author.id)
           .setColor('RANDOM')
           msg.channel.send(Embed)
           DB.set(`userBackground_${msg.author.id}`, 'http://4.bp.blogspot.com/-stkUR7dTINk/TnWLnr48JPI/AAAAAAAAAh8/gw-rjcbc_lY/s1600/Abstract+Rainbow+Colored+Background+1366.jpg')
      break;
      }
      case "Flora" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setDescription('Agora, você pode ver seu perfil em: https://ryouji.glitch.me/user/' + msg.author.id)
           .setColor('GREEN')
           msg.channel.send(Embed)
           DB.set(`userBackground_${msg.author.id}`, 'https://www.planwallpaper.com/static/images/desktop-backgrounds1_wvNeWqW.jpg')
      break;
      }
      case "R6" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setDescription('Agora, você pode ver seu perfil em: https://ryouji.glitch.me/user/' + msg.author.id)
           .setColor('GREY')
           msg.channel.send(Embed)
        DB.set(`userBackground_${msg.author.id}`, 'https://www.windowscentral.com/sites/wpcentral.com/files/styles/xlarge/public/field/image/2018/05/rainbow-six-siege-elite-skins-hero.jpg?itok=bzr8ch4K')
       break
      }
      case "Steams" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setDescription('Agora, você pode ver seu perfil em: https://ryouji.glitch.me/user/' + msg.author.id)
           .setColor('#579164')
           msg.channel.send(Embed)
        DB.set(`userBackground_${msg.author.id}`, 'https://i.imgur.com/6XxLQkY.gif')
       break
      }
    }

   }
   break;
  }

 
}

 }); 
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['background'],
    permLevel: 0,
  manu: false
};

exports.help = {
    name: 'Background',
    category: '🌠 Cosméticos',
    description: 'Se você possuir o item Background, você poderá alterar o mesmo através desse comando',
    usage: 'r!background'
};