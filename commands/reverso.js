const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {

  if(!args[0]) return message.channel.send('Uso correto: **r!reverso [texto para reverter]**');

  function reverseString(str) {
      return str.split("").reverse().join("");
  }

  let sreverse = reverseString(args.join(' '))
   
  if(args[0] === sreverse) {
  
  sreverse = `${args.join(' ')}..Espere... Você quebrou isto!`
  
  }
  message.channel.send(sreverse)
    

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['reverso', 'reverse', 'revertir'],
	permLevel: 0
};

exports.help = {
	name: 'Reverso',
	category: '🎉 Diversão',
	description: 'Escreve seu texto ao contrário',
	usage: 'r!reverso [texto]'
};
