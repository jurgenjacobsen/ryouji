exports.run = async (client, message, args) => { 
	var sayMessage = args.join(' ');
	message.delete().catch(O_o=>{});
	message.channel.send(sayMessage);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['say', 'dizer'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Say',
    category: '🎉 Diversão',
    description: 'Envia um texto por você',
    usage: 'r!say [texto]'
};