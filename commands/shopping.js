const Discord = require('discord.js'),
      db = require('quick.db');
exports.run = async (client, message, args) => { 
switch (args[0]) {  
  case 'badge': {
   const pagar = 250;
   db.fetch(`userBalance_${message.author.id}`).then(bucks => {
   if (!bucks >= pagar) {
			message.reply('Você não tem dinheiro o suficiente');
		} else if (bucks >= pagar) {   
   db.fetch(`userItems_${message.author.id}_badge`).then(i => {
      if(i == 0) {
       db.fetch(`userBalance_${message.author.id}`).then(conta => {
				const desconto = parseInt(conta) - parseInt(pagar);
				db.set(`userBalance_${message.author.id}`, desconto);
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

  case 'premium': {
   const pagar = 850;
   db.fetch(`userBalance_${message.author.id}`).then(bucks => {
   if (!bucks >= pagar) {
			message.reply('Você não tem dinheiro o suficiente');
		} else if (bucks >= pagar) {   
   db.fetch(`userItems_${message.author.id}_premium`).then(i => {
      if(i == null) {
        db.fetch(`userBalance_${message.author.id}`).then(conta => {
				const desconto = parseInt(conta) - parseInt(pagar);
				db.set(`userBalance_${message.author.id}`, desconto);
			  });
        db.set(`userItems_${message.author.id}_premium`, 1);
        message.channel.send('Você comprou o Premium Pass');
      } else {
        message.channel.send('Você já possui o Premium Pass')
      };
     });
    }
   });
   break;
  }
}
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['comprar', 'buy'],
    permLevel: 0
};

exports.help = {
    name: 'Comprar',
    category: '💳 Econômia',
    description: 'Compre itens para customizações',
    usage: 'r!comprar [item]'
};