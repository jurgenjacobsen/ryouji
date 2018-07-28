const Discord = require('discord.js'),
      db = require('quick.db');
exports.run = async (client, message, args) => { 
const itens = client.itens;
if(args[0]) {
switch (args[0]) {  
  case 'Badge': {
   const pagar = itens.badge.valor;
   db.fetch(`userBalance2.0_${message.author.id}`).then(bucks => {
   if (!bucks >= pagar) {
			message.reply('Você não tem dinheiro o suficiente');
		} else if (bucks >= pagar) {   
   db.fetch(`userItems_${message.author.id}_badge`).then(i => {
      if(i == 0) {
       db.fetch(`userBalance2.0_${message.author.id}`).then(conta => {
				const desconto = parseInt(conta) - parseInt(pagar);
				db.set(`userBalance2.0_${message.author.id}`, desconto);
			});
        db.add(`userItems_${message.author.id}_badge`, 1);
        message.channel.send('Você comprou minha badge!');
      } else {
        message.channel.send('Você já possui minha badge!');
      };
     });
    };
   });
    break;
  }

  case 'Premium': {
   const pagar = itens.premium.valor;
   db.fetch(`userBalance2.0_${message.author.id}`).then(bucks => {
   if (!bucks >= pagar) {
			message.reply('Você não tem dinheiro o suficiente');
		} else if (bucks >= pagar) {   
   db.fetch(`userItems_${message.author.id}_premium1`).then(i => {
      if(i == null) {
        db.fetch(`userBalance2.0_${message.author.id}`).then(conta => {
				const desconto = parseInt(conta) - parseInt(pagar);
				db.set(`userBalance2.0_${message.author.id}`, desconto);
			  });
        db.set(`userItems_${message.author.id}_premium1`, 1);
        message.channel.send('Você comprou o Premium Pass');
      } else {
        message.channel.send('Você já possui o Premium Pass')
      };
     });
    }
   });
   break;
  }

  case 'Bonus': {
   const pagar = itens.bonus.valor;
   db.fetch(`userBalance2.0_${message.author.id}`).then(bucks => {
    if(!bucks >= pagar) {
      message.reply('Você não tem dinheiro suficiente');
    } else if(bucks >= pagar) {
     db.fetch(`userItems_${message.author.id}_bonus`).then(i => {
      if(i == null || i == 0) {
        const desconto = parseInt(bucks) - parseInt(pagar);
				db.set(`userBalance2.0_${message.author.id}`, desconto);
        db.set(`userItems_${message.author.id}_bonus`, 1);
        message.channel.send('Você comprou o Bonus de XP!');
      } else {
        message.channel.send('Você já possui o Bonus');
      }
     });
    }
   });
  break;
  }

   case 'Parceria': {
    if(message.guild) {
     db.fetch(`userBalance2.0_${message.author.id}`).then(bucks => {
      if(!bucks >= client.config.itens.partner.valor) {
        message.reply('Você não tem dinheiro suficiente')
      } else if(bucks >= client.config.itens.partner.valor) {
        db.fetch(`userItems_${message.author.id}_partner`).then(i => {
         if(i == null || i == 0) {
          let desconto = parseInt(bucks) - parseInt(client.config.itens.partner.valor);
				   db.set(`userBalance2.0_${message.author.id}`, desconto);
           db.set(`userItems_${message.guild.id}_partner`, 1);
           db.set(`partner_${message.author.id}`)
         message.channel.send('Você comprou a Parceria de Servidor! Entre em: https://ryouji.glitch.me/servers Para ver a parceria!');
         client.users.get(client.config.ownerID).send('<:yes:470363478817767439> ' + message.author + ' comprou o Pack De Parceria no servidor ' + message.guild.name + ', ID: ' + message.guild.id)
      } else {
        message.channel.send('Você já comprou a Parceria por mais de 5 vezes!');
      }
       });
     };
    });
   } else {
    message.reply('Você deve estar em um servidor para fazer isso!');
   }
   break;
  }

  case 'Background': {
    const pagar = itens.background.valor;
    db.fetch(`userBalance2.0_${message.author.id}`).then(bucks => {
    if(!bucks >= pagar) {
      message.reply('Você não tem dinheiro suficiente');
    } else if(bucks >= pagar) {
     db.fetch(`userItems_${message.author.id}_background`).then(i => {
      if(i == null) {
        const desconto = parseInt(bucks) - parseInt(pagar);
				db.set(`userBalance2.0_${message.author.id}`, desconto);
        db.set(`userItems_${message.author.id}_background`, 1);
        message.channel.send('Você comprou o Background, dê r!background para utilizá-lo!');
      } else {
        message.channel.send('Você já possui o Background');
      }
     });
    }
   });
   break;
  }
 }
} else {
 message.reply(`Dê **r!lista** para ver os itens disponíveis para compra!`)
}
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['comprar', 'buy'],
    permLevel: 0,
    manu: true
};

exports.help = {
    name: 'Comprar',
    category: '💳 Econômia',
    description: 'Compre itens para customizações',
    usage: 'r!comprar [item]'
};