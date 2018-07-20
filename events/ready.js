module.exports = async client => {


	if (!client.user.bot) {
		client.log('ERROR', '', 'INFO');
		return process.exit(0);
	}

	await wait(1000);

	client.appInfo = await client.fetchApplication();
	setInterval(async () => {
		client.appInfo = await client.fetchApplication();
	}, 60000);

	require('../modules/dashboard')(client);


	var cMembers = client.users.filter(u => u.id !== '1').size;
	var gCount = client.guilds.size;

	client.log('EVENT', `Logged into '${client.user.tag}' (${client.user.id}). Ligado com ${cMembers} usuários em ${gCount} servidores. Versão do bot ${client.config.version}`);

	var g = [];
	client.guilds.forEach(guild => g.push(guild.id));

  for (var i = 0; i < g.length; i++) {
		if (!client.settings.get(g[i])) {
			client.settings.set(g[i], client.config.defaultSettings);
		}
	}

let statuses = ['felicidade e amor para todos os meus usuários | 🔨 Criado por: Eleven#0001', `em ${client.guilds.size} servidoresㅤㅤㅤㅤㅤ | 🔨 Criado por: Eleven#0001`, `com ${client.users.size} usuários ㅤㅤ | 🔨 Criado por: Eleven#0001`]

setInterval(function() {
  
 let status = statuses[Math.floor(Math.random() * statuses.length)];

 client.user.setPresence({ status: client.config.status, game: { name: status, type: 0 } });
  
}, 8000);

const Discord = require('discord.js');

const canal = client.channels.get('466040811453153300')
const readyOwnEmbed = new Discord.RichEmbed()
.setTitle('Inciadoㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
.setColor('#23272A')
.setFooter(client.user.username, client.user.avatarURL);

canal.send(readyOwnEmbed);

}