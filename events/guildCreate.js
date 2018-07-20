module.exports = (client, guild) => {
	wait(1000); // eslint-disable-line no-undef
	client.log('[LOG]', `Entrei em ${guild.name} (${guild.id})`, 'GUILD');

  client.settings.set(guild.id, client.config.defaultSettings);


};
