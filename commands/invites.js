const Discord = require('discord.js')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

let invites = await message.guild.fetchInvites().catch(error => {
        return message.reply('Perdão, mas você ou eu não possuímos permissões para ver os convites');
    });

    invites = invites.array();

    let possibleinvites = [];
    invites.forEach(function(invites) {
        possibleinvites.push(`${invites.inviter.username} | ${invites.uses}`)
    })

    const embed = new Discord.RichEmbed()
        .setTitle(`**INVITE LEADERBOARD**`)
        .setColor('#23272A')
        .addField('Invites', `\`\`\`${possibleinvites.join('\n')}\`\`\``)
        .setTimestamp();
    message.channel.send(embed);

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['top', 'topinvites'],
	permLevel: 0
};

exports.help = {
	name: 'TopInvites',
	category: '💈 Utilitários',
	description: 'Mostra a lista de convites do servidor',
	usage: 'r!invites'
};
