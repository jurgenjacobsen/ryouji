var moment = require('moment');
var db = require('quick.db');

module.exports = (client) => {

	client.permlevel = message => {
		let permlvl = 0;

		var ownerID = client.config.ownerID;

		if (message.author.id === ownerID) return 10;

		if (message.channel.type === 'dm' || !message.member) return 0;

		try {
			const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modLogChannel.toLowerCase());
			if (modRole && message.member.roles.has(modRole.id)) permlvl = 2;
		} catch (e) {
			console.warn('modRole not present in guild settings. Skipping Moderator (level 2) check');
		}
		try {
			const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
			if (adminRole && message.member.roles.has(adminRole.id)) permlvl = 3;
		} catch (e) {
			console.warn('adminRole not present in guild settings. Skipping Administrator (level 3) check');
		}

		if (message.author === message.guild.owner) permlvl = 4;

		return permlvl;
	};

	client.permLevels = {
		0: 'Usuário',
		2: 'Moderador',
		3: 'Administrador',
		4: 'Dono do Servidor',
    9: 'WhiteList',
		10: 'Dono do Bot'
	};

	client.pointsMonitor = (client, message) => {
		const db = require('quick.db');
		let amount;
		db.fetch(`userItems_${message.author.id}_bonus`).then(i => {
			if (i >= 1) {
				amount = 0.5;
			} else {
				amount = 0.01
			}
			if (message.channel.type !== 'text') return;
			const settings = client.settings.get(message.guild.id);
			const score = client.points.get(`${message.guild.id}-${message.author.id}`) || {
				points: 0,
				level: 0
			};
			score.points++;
			const curLevel = Math.floor(amount * Math.sqrt(score.points));
			if (score.level < curLevel) {
				message.reply(`Você upou para o nível **${curLevel}**!`);
				score.level = curLevel;
			}
			client.points.set(`${message.guild.id}-${message.author.id}`, score);
		})
	};

	client.log = (type, msg, title) => {
		var time = moment().format(client.config.logTimeFormat);
		if (!title) title = 'Log';
		console.log(`${time}: [${type}] [${title}] ${msg}`);
	};

	client.awaitReply = async (msg, question, limit = 60000) => {
		const filter = m => m.author.id = msg.author.id;
		await msg.channel.send(question);
		try {
			const collected = await msg.channel.awaitMessages(filter, {
				max: 1,
				time: limit,
				errors: ['time']
			});
			return collected.first().content;
		} catch (e) {
			return false;
		}
	};

	client.awaitReply = async (msg, question, limit = 60000) => {
		const filter = m => m.author.id = msg.author.id;
		await msg.channel.send(question);
		try {
			const collected = await msg.channel.awaitMessages(filter, {
				max: 1,
				time: limit,
				errors: ['time']
			});
			return collected.first().content;
		} catch (e) {
			return false;
		}
	};

	client.clean = (client, text) => {
		if (typeof evaled !== 'string') text = require('util').inspect(text, {
			depth: 0
		});
		//console.log(`T (${typeof text}): ${text}`);

		var t = text
			.replace(/`/g, '`' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
			.replace(/@/g, '@' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
			.replace(/\n/g, '\n' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
			.replace(client.config.token, 'mfa.VkO_2G4Qv3T-- NO TOKEN HERE --')
			.replace(client.config.dashboard.oauthSecret, 'Nk-- NOPE --')
			.replace(client.config.dashboard.sessionSecret, 'B8-- NOPE --')
			.replace(client.config.cleverbotToken, 'CC-- NOPE --')
			.replace(client.config.googleAPIToken, 'AI-- NOPE --...');

		//console.log(`T2 (${typeof t}): ${t}`);

		return t;
	};


	/* MISCELANEOUS NON-CRITICAL FUNCTIONS */

	String.prototype.toProperCase = function() {
		return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	};

	// `await wait(1000);` to "pause" for 1 second.
	global.wait = require('util').promisify(setTimeout);


	// Another semi-useful utility command, which creates a "range" of numbers
	// in an array. `range(10).forEach()` loops 10 times for instance. Why?
	// Because honestly for...i loops are ugly.
	global.range = (count, start = 0) => {
		const myArr = [];
		for (var i = 0; i < count; i++) {
			myArr[i] = i + start;
		}
		return myArr;
	};

	client.version = require('../package.json').version;

	// These 2 simply handle unhandled things. Like Magic. /shrug

};