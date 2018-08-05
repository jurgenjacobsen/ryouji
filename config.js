/* eslint-disable */
const vault = process.env;
var config = {
    ownerID: vault.OWNERID,
    token: vault.TOKEN,
    status: 'online',
    shards: '0',
    debug: 'false',
    color: '#36393F',
    playingGame: 'felicidade e amor para todos os meus usuários | 🔨 Criado por: Eleven#001',
    purgeLogFormat: '\n ID da Mensagem: {{mID}} | Hora: {{mTS}} | Conteúdo: {{mC}} \n',
    eightBallResponses: ['Sim', 'Não', 'Certamente', 'Minhas fontes dizem sim', 'Tente mais tarde...', 'Sem dúvida', 'É melhor não contar agora'],
    googleAPIToken: vault.GOOGLEAPITOKEN,
    logTimeFormat: 'LLLL',
    version: '3.1.6',
    musicEnabled: 'true',
    defaultSettings: {
        prefix: 'r!',
        modLogChannel: 'logs',
        modRole: 'Moderador',
        adminRole: 'Administrador',
        welcomeChannel: '⚫bem-vindos',
        welcomeMessage: 'Bem-Vindo {{user}} ao **{{guild}}!**',
        byeMessage: "Adeus **{{user}}**, Volte Sempre!",
        welcomeEnabled: 'true',
        inviteFilterEnabled: 'true',
        inviteWhitelist: ['Dono'],
        facepalms: 'true',
        swearFilter: 'true',
        swearWords: ['arrombado', 'ryouji lixo'],
        logDeletes: 'true',
        logNewMember: 'false',
        logMemberLeave: 'false',
        logCommandUsage: 'true',
        logPurge: 'false',
        commandTimeout: '2000',
        sendHelp: 'dm'
    },
    dashboard: {
        enabled: 'true',
        oauthSecret: vault.OAUTHSECRET,
        secure: 'true',
        sessionSecret: vault.SESSIONSECRET,
        domain: `ryouji.glitch.me`,
        port:  vault.PORT,
        invitePerm: vault.INVITEPERM,
        protectStats: 'false',
        borderedStats: 'true',
        legalTemplates: {
            contactEmail: 'devs_services@engineer.com',
            lastEdited: '01 de Julho de 2018'
        }
    }
};


module.exports = config;