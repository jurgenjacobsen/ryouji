
const Discord = require('discord.js');

const moment = require("moment");

const db = require('quick.db');

exports.run = async (client, message, args) => {
  
	let user;

    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if(args[0]) {
        user = client.users.get(args[0]);
    } else {
        user = message.author;
    }

	

const userStats = {
 'online': '<:online:470363783605256225> Online',
 'idle': '<:idle:470363783563444225> Ausente',
 'dnd': '<:donotdisturb:470363783538409472> Não perturbe',
 'offline': '<:offline:470363783630684160> Offline',
}[user.presence.status];

const isBot = {
'true': 'O usuário é um bot',
'false': 'O usuário não é um bot',
}[user.bot]

var reps = await db.fetch(`userRep1_${user.id}`);
  
    const embed = new Discord.RichEmbed()
		.setColor('#23272A')
		.setThumbnail(user.avatarURL + '?size=512')
		.setTitle(`${user.username}#${user.discriminator}`)
		.addField(":clipboard: ID:", `${user.id}`, true)
		.addField(":calendar_spiral:  Conta criada:", `${moment.utc(user.createdAt).format('LLLL').replace('January', 'Janeiro').replace('February', 'Fevereiro').replace('March', 'Março').replace('April', 'Abril').replace('May', 'Maio').replace('June', 'Junho').replace('July', 'Julho').replace('August', 'Agosto').replace('September', 'Setembro').replace('October', 'Outubro').replace('November', 'Novembro').replace('December', 'Dezembro').replace('Sunday', 'Domingo').replace('Monday', 'Segunda-Feira').replace('Tuesday', 'Terça-Feira').replace('Wednesday', 'Quarta-Feira').replace('Thursday', 'Quinta-Feira').replace('Friday', 'Sexta-Feira').replace('Saturday', 'Sábado')}`, true)
		.addField("<:bot:470365210423722015> Bot:", `${isBot}`)
		.addField(":battery: Status:", `${userStats}`, true)
		.addField(":joystick: Jogando:", `${user.presence.game ? user.presence.game.name : 'Não está jogando nada'}`, true)
    .addField(":link: Perfil:", `https://ryouji.glitch.me/user/${user.id}`)
    .addField("<:rp:470364256832061442> Pontos de Reputação:", reps !== null ? reps : 'Nada')
		.setFooter(`Respondendo para ${message.author.username}#${message.author.discriminator}`)

	if (message.channel.type !== 'dm') {
   const member = message.guild.member(user);
    embed.addField(":calendar: Entrou no servidor:", `${moment.utc(member.joinedAt).format('LLLL').replace('January', 'Janeiro').replace('February', 'Fevereiro').replace('March', 'Março').replace('April', 'Abril').replace('May', 'Maio').replace('June', 'Junho').replace('July', 'Julho').replace('August', 'Agosto').replace('September', 'Setembro').replace('October', 'Outubro').replace('November', 'Novembro').replace('December', 'Dezembro').replace('Sunday', 'Domingo').replace('Monday', 'Segunda-Feira').replace('Tuesday', 'Terça-Feira').replace('Wednesday', 'Quarta-Feira').replace('Thursday', 'Quinta-Feira').replace('Friday', 'Sexta-Feira').replace('Saturday', 'Sábado')}`, true)
    .addField(":pen_ballpoint: Nickname:", `ㅤ${member.nickname !== null ? `${member.nickname}` : 'ㅤNenhum'}`, true)
		.addField(":briefcase: Cargos:", message.guild.members.get(user.id).roles.filter(r => r.position !== 0).map(R => R.name).join(', ') || 'Sem Cargos'.replace('@everyone, ', ''), true)  

}

     message.channel.send({embed});
    }

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['userinfo'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'UserInfo',
	category: '💈 Utilitários',
	description: 'Mostra as informações do usuário',
	usage: 'r!userinfo / r!userinfo [@user]'
};