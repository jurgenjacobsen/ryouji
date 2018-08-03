module.exports = (client) => {
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager(`${__dirname}/bot.js`, { totalShards: 3 });

manager.spawn();
manager.on('launch', shard => {

console.log(`Successfully launched shard ${shard.id}`)
client.users.get(client.config.ownerID).send(shard.id)

});
}