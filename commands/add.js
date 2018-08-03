const Discord = require('discord.js'),
      db = require('quick.db'),
      c = require('currency-formatter');

exports.run = async (client, message, args) => { 

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['add', 'Adicionar'],
    permLevel: 10,
    manu: false
};

exports.help = {
    name: 'Adicionar',
    category: '🔧 Sistema',
    description: 'Adiciona algum item à um membro',
    usage: 'r!add [item]'
};