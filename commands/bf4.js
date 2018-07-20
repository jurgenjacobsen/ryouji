exports.run = async (client, message, args) => { 
const request = require('request-promise-native');

 try {
let platform;
let username;
if(!['pc', 'ps4', 'xone', 'ps3', 'xbox'].includes(args[0])) return message.channel.send('<:recusada:459814888064286730> **|** **Por favor especifique a plataforma:** `s!bf4 <plataforma [ pc | xone | ps4 | ps3 | xbox]> <usuario>`');
if(!args[1]) return message.channel.send('<:recusada:459814888064286730> **|** **Por favor insira o primeiro nome:** `s!bf4 <plataforma [ pc | xone | ps4 | ps3 | xbox] <usuario>`');

platform = args[0];
username = args[1];

    let options = {
      url: `https://api.bf4stats.com/api/playerInfo?plat=${platform}&name=${username}&output=json`,
      json: true
    };
    let response = await request(options);

    message.channel.send({
      embed: {
        color: 0xe9ff00,
        author: {
          name: `${response.player.name}`,
          url: response.player.blPlayer
        },
        title: 'Battlefield 4 - Estatísticas',
        description: `Jogou por ${(response.player.timePlayed / 60 / 60).toFixed(2)} horas`,
        fields: [
          {
            name: 'Classificação',
            value: `${response.player.rank.nr} - ${response.player.rank.name}`,
            inline: true
          },
          {
            name: 'Pontos',
            value: `${response.player.score}`,
            inline: true
          },
          {
            name: 'Habilidades',
            value: `${response.stats.skill}`,
            inline: true
          },
          {
            name: 'SPM',
            value: `${(response.stats.extra.spm).toFixed(2)}`,
            inline: true
          },
          {
            name: 'KPM',
            value: `${(response.stats.extra.kpm).toFixed(2)}`,
            inline: true
          },
          {
            name: 'Vitórias',
            value: `${response.stats.numWins}`,
            inline: true
          },
          {
            name: 'Derrotas',
            value: `${response.stats.numLosses}`,
            inline: true
          },
          {
            name: 'W/L',
            value: `${(response.stats.extra.wlr).toFixed(2)}`,
            inline: true
          },
          {
            name: 'Jogadores mortos',
            value: `${response.stats.kills}`,
            inline: true
          },
          {
            name: 'Mortes',
            value: `${response.stats.deaths}`,
            inline: true
          },
          {
            name: 'K/D',
            value: `${(response.stats.extra.kdr).toFixed(2)}`,
            inline: true
          }
        ],
        thumbnail: {
          url: 'https://rocketdock.com/images/screenshots/Battlefield4_byWar36.png'
        },
        footer: {
          text: 'Distribuído por Battlefield 4.'
        }
      }
    }).catch(e => {
      console.error(e);
    });
  }
  catch (e) {
    if (e.response) {
      return console.error('error', e.response.statusCode, e.response.statusMessage, message.channel);
    }
    console.error(e);
  }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bf4', 'battlefield4'],
    permLevel: 0
};

exports.help = {
    name: 'BF4',
    category: '🎉 Diversão',
    description: 'Obtenha informações sobre um usuário de BF4',
    usage: 'r!bf4 '
};