module.exports = async client => {
	const moment = require('moment');

	if (!client.user.bot) {
		client.log('[ERRO]', '', '[INFO]');
		return process.exit(0);
	}

	await wait(1000);

	client.appInfo = await client.fetchApplication();
	setInterval(async () => {
		client.appInfo = await client.fetchApplication();
	}, 60000);

	require('../modules/dashboard')(client);

	let statuses = [
    `felicidade e amor para todos os meus usuários | 🔨 Criado por: Eleven#0001`,
		`em ${client.guilds.size} servidoresㅤㅤㅤㅤㅤ | 🔨 Criado por: Eleven#0001`,
    `com ${client.users.size} usuáriosㅤㅤㅤㅤㅤ | 🔨 Criado por: Eleven#0001`,
    `na ${client.guilds.get('475397487608463361').name} - By ${client.users.get('226865242095878144').tag}`
	]; 

	setInterval(function() {

		let status = statuses[Math.floor(Math.random() * statuses.length)];

		client.user.setPresence({
			status: client.config.status,
			game: {
				name: status,
				type: 0
			}
		});

	}, 8000);

	setInterval(function() {
		let usersCh = client.channels.get('470350592825622548');
		let guildsCh = client.channels.get('470350687537201163');
		let channelsCh = client.channels.get('470350643664650260');

    let chatVoiceCh = client.channels.get('470353627291189260');
    let vespertineDevsCh = client.channels.get('472872764961718272');

		usersCh.setName(`🚹Usuários ${client.users.size}`);
		guildsCh.setName(`👥Servidores ${client.guilds.size}`);
		channelsCh.setName(`📳Canais ${client.channels.size}`);

    chatVoiceCh.join();
    vespertineDevsCh.join();
    

	}, 10000)

	const Discord = require('discord.js');

	const canal = client.channels.get('466040811453153300')
	const readyOwnEmbed = new Discord.RichEmbed()
		.setTitle('Inciadoㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
		.setColor('#23272A')
		.setFooter(client.user.username, client.user.avatarURL);

	canal.send(readyOwnEmbed);

const snekfetch = require('snekfetch');
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1MjU4NTIwNTk3NTM1MTI5NyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTMyMjE5NTMzfQ.Unvh9V-Wyg6FvAaTecsdvemK71S_sTZh0yJBwFquJIA';


setInterval(function(){
 snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
    .set('Authorization', key)
    .send({server_count: client.guilds.size, shard_count: client.config.shards})
    .then(() => console.log(`Posted to dbl.`))
    .catch((e) => console.error(e));
  }, 60000);
 }