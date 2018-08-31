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
    `com ${client.emojis.size} emojis ㅤㅤㅤㅤㅤ | 🔨 Criado por: Eleven#0001`,
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
	}, 15000);

	const Discord = require('discord.js');

	const canal = client.channels.get('466040811453153300')
	const readyOwnEmbed = new Discord.RichEmbed()
		.setTitle('Inciadoㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
		.setColor('#23272A')
		.setFooter(client.user.username, client.user.avatarURL);

	canal.send(readyOwnEmbed);

const snekfetch = require('snekfetch');
const key = process.env.DBLTOKEN;


setInterval(function(){
 snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
    .set('Authorization', key)
    .send({server_count: client.guilds.size, shard_count: client.config.shards})
    .then(() => console.log(`https://discordbots.org - Postado Guild Count`))
    .catch((e) => console.error(e));

  const Botlist_space = require('botlist.space');
  const botlist_space_post = new Botlist_space(client.user.id, process.env.BOTSLIST_SPACE_TOKEN);

  botlist_space_post.postServerCount(client.guilds.size).then(() => {
   console.log('https://botlist.space - Postado Guild Count');
  });
  
  snekfetch.put("https://bots.perfectdreams.net/api/v1/bot/"+ client.user.id +"/stats")
  .set("Authorization", process.env.VESPERTINE_BOTLIST_TOKEN)
  .send({guildCount: client.guilds.size})
  .then(() => console.log("https://bots.perfectdreams.net - Deu certo meu patral!"))
  .catch(e => console.log("Não deu certo meu patral!\n" + e));

 }, 60000);
}