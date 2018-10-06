module.exports = async client => {
	const moment = require('moment');
  let db = require('quick.db');

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
		`em ${client.guilds.size} servidoresㅤㅤㅤㅤㅤ | 🔨 Criado por: Eleven#0001`,
    `com ${client.users.size} usuáriosㅤㅤㅤㅤㅤ | 🔨 Criado por: Eleven#0001`,
    `com ${client.emojis.size} emojis ㅤㅤㅤㅤㅤ | 🔨 Criado por: Eleven#0001`,
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
    client.log('EVENT', status, 'ALTERAÇÃO DE STATUS');
	}, 15000);


const snekfetch = require('snekfetch');

setInterval(function(){
 snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
    .set('Authorization', process.env.DBLTOKEN)
    .send({server_count: client.guilds.size, shard_count: client.config.shards})
    .then(() => console.log(`https://discordbots.org - Postado Guild Count`))
    .catch((e) => console.error(e));

  const Botlist_space = require('botlist.space');
  const botlist_space_post = new Botlist_space(client.user.id, process.env.BOTSLIST_SPACE_TOKEN);

  botlist_space_post.postServerCount(client.guilds.size).then(() => {
   console.log('https://botlist.space - Postado Guild Count');
  });

/*  
  snekfetch.put("https://bots.perfectdreams.net/api/v1/bot/"+ client.user.id +"/stats")
  .set("Authorization", process.env.VESPERTINE_BOTLIST_TOKEN)
  .send({guildCount: client.guilds.size})
  .then(() => console.log("https://bots.perfectdreams.net - Deu certo meu patral!"))
  .catch(e => console.log("Não deu certo meu patral!\n" + e));
*/

 var api = require("perfect-dreams-api")
 var bot = new api.Bot(client.user.id, process.env.VESPERTINE_BOTLIST_TOKEN)
 bot.updateGuildCount(client.guilds.size).then(() => {console.log('https://bots.perfectdreams.net - Postado Guild Count')});

 }, 60000);

 client.guilds.forEach(guild => {
  db.fetch(`guildSettings_${guild.id}_welcomeChannel`).then(welcomeChannel => {
  db.fetch(`guildSettings_${guild.id}_byeChannel`).then(byeChannel => {
  db.fetch(`guildSettings_${guild.id}_welcomeMessage`).then(welcomeMessage => {
  db.fetch(`guildSettings_${guild.id}_byeMessage`).then(byeMessage => {
  db.fetch(`guildSettings_${guild.id}_welcomeAutoRole`).then(welcomeAutoRole => {
  db.fetch(`guildSettings_${guild.id}_showInServersList`).then(showInServersList => {
    
  const guildSettings = {
   welcomeChannel: welcomeChannel,
   byeChannel: byeChannel,
   welcomeMessage: welcomeMessage,
   byeMessage: byeMessage,
   welcomeAutoRole: welcomeAutoRole,
   showInServersList: showInServersList,
  };

  client.guilds.get(guild.id).options =  guildSettings;

  });
  });
  });
  });
  });
  });
 });

}