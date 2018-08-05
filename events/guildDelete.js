// This event executes when a new guild (server) is left.

module.exports = (client, guild) => {
	client.log('[LOG]', `Saí de ${guild.name} (${guild.id})`, 'GUILD');
};
