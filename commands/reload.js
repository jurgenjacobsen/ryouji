exports.run = async (client, message, args, level) => {
    if (message.author.id === '292065674338107393') {
        if (!args || args.size < 1) return message.channel.send("Indique um comando");
        let command = args[0].toLowerCase();
        delete require.cache[require.resolve(`./${command}.js`)];
        message.channel.send(`O comando **${command}** foi recarregado.`)
    }
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['reload'],
	permLevel: 10
};

exports.help = {
	name: 'Reload',
	category: '🔧 Sistema',
	description: 'Recarrega um comando após ter cido modificado',
	usage: 'r!reload [comando]'
};