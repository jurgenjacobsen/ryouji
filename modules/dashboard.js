const url = require('url');
const path = require('path');
const fs = require('fs');


const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms');
const cF = require('currency-formatter');

const express = require('express');
const app = express();

const passport = require('passport');
const session = require('express-session');
const Strategy = require('passport-discord').Strategy;

const md = require('marked');

const morgan = require('morgan');

const moment = require('moment');
require('moment-duration-format');

module.exports = (client) => {

	if (client.config.dashboard.enabled !== 'true') return client.log('log', 'Dashboard está desligado', 'INFO');

	const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);

	const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

	app.set('trust proxy', 5);

	app.use('/public', express.static(path.resolve(`${dataDir}${path.sep}public`), { maxAge: '10d' }));
	app.use(morgan('combined'));

	passport.serializeUser((user, done) => {
		done(null, user);
	});
	passport.deserializeUser((obj, done) => {
		done(null, obj);
	});

	var protocol;

	if (client.config.dashboard.secure === 'true') {
		client.protocol = 'https://';
	} else {
		client.protocol = 'http://';
	}

	protocol = client.protocol;

	if (client.config.dashboard.secure === 'true') {
		client.protocol = 'https://';
	} else {
		client.protocol = 'http://';
	}

	protocol = client.protocol;

	client.callbackURL = `https://ryouji.glitch.me/callback`;
	client.log('log', `Callback URL: ${client.callbackURL}`, 'INFO');
	passport.use(new Strategy({
		clientID: client.appInfo.id,
		clientSecret: client.config.dashboard.oauthSecret,
		callbackURL: client.callbackURL,
		scope: ['identify', 'guilds', 'email', 'guilds.join']
	},
	(accessToken, refreshToken, profile, done) => {
		process.nextTick(() => done(null, profile));
	}))

app.use(session({
		secret: client.config.dashboard.sessionSecret,
		resave: true,
		saveUninitialized: false,
	}));

	// Initializes passport and session.
	app.use(passport.initialize());
	app.use(passport.session());

	// The domain name used in various endpoints to link between pages.
	app.locals.domain = client.config.dashboard.domain;

	// The EJS templating engine gives us more power
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');

	// body-parser reads incoming JSON or FORM data and simplifies their
	// use in code.
	var bodyParser = require('body-parser');
	app.use(bodyParser.json()); // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
		extended: true
	}));

	function checkAuth(req, res, next) {
		if (req.isAuthenticated()) return next();
		req.session.backURL = req.url;
		res.redirect('/login');
	}

	function cAuth(req, res) {
		if (req.isAuthenticated()) return;
		req.session.backURL = req.url;
		res.redirect('/login');
	}

	function checkAdmin(req, res, next) {
		if (req.isAuthenticated() && req.user.id === client.config.ownerID) return next();
		req.session.backURL = req.originalURL;
		res.redirect('/');
	}

	var privacyMD = '';
	fs.readFile(`${process.cwd()}${path.sep}dashboard${path.sep}public${path.sep}PRIVACY.md`, function(err, data) {
		if (err) {
			console.log(err);
			privacyMD = 'Error';
			return;
		}
		privacyMD = data.toString().replace(/\{\{botName\}\}/g, client.user.username).replace(/\{\{email\}\}/g, client.config.dashboard.legalTemplates.contactEmail);
		if (client.config.dashboard.secure !== 'true') {
			privacyMD = privacyMD.replace('Sensitive and private data exchange between the Site and its Users happens over a SSL secured communication channel and is encrypted and protected with digital signatures.', '');
		}
	});

	var termsMD = '';
	fs.readFile(`${process.cwd()}${path.sep}dashboard${path.sep}public${path.sep}TERMS.md`, function(err, data) {
		if (err) {
			console.log(err);
			privacyMD = 'Error';
			return;
		}
		termsMD = data.toString().replace(/\{\{botName\}\}/g, client.user.username).replace(/\{\{email\}\}/g, client.config.dashboard.legalTemplates.contactEmail);
	});

 // Página de índice. Se o usuário for autenticado, ele mostrará suas informações
 // no canto superior direito da tela.


	app.get('/', (req, res) => {
    const duration = moment.duration(client.uptime).format(' D[d], H[h], m[m], s[s]');
		const members = client.users.size
		const textChannels = client.channels.filter(c => c.type === 'text').size;
		const voiceChannels = client.channels.filter(c => c.type === 'voice').size;
		const guilds = client.guilds.size;
    const user = req.user;
		if (req.isAuthenticated()) {
			res.render(path.resolve(`${templateDir}${path.sep}index.ejs`), {
			 bot: client,
			 auth: true,
			 user: user,
       stats: {
				 servers: guilds,
				 members: members,
				 text: textChannels,
				 voice: voiceChannels,
			 	 uptime: duration,
			 	 commands: client.commandsNumber,
				 memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
				 dVersion: Discord.version,
				 nVersion: process.version,
				 bVersion: client.config.version,
		 	  },
     });
		} else {
			res.render(path.resolve(`${templateDir}${path.sep}index.ejs`), {
				bot: client,
				auth: false,
				user: null,
        stats: {
				 servers: guilds,
				 members: members,
				 text: textChannels,
				 voice: voiceChannels,
			 	 uptime: duration,
			 	 commands: client.commandsNumber,
				 memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
				 dVersion: Discord.version,
				 nVersion: process.version,
				 bVersion: client.config.version,
			 }
			});
		}
	});

app.get('/user/:userID', (req, res) => {

const usuário = client.users.get(req.params.userID)
const moment = require('moment')
let badge;
db.fetch(`userBackground_${usuário.id}`).then(back => {
 db.fetch(`userItems_${usuário.id}_background1`).then(bg => {
  db.fetch(`userBalance2.0_${usuário.id}`).then(cB => {
   const coins = cF.format(cB, { code: 'BRL' });
    db.fetch(`userRep1_${usuário.id}`).then(r => {
     db.fetch(`userItems_${usuário.id}_premium1`).then(p => {
      db.fetch(`userItems_${usuário.id}_badge1`).then(b => {
       db.fetch(`userDesc_${usuário.id}`).then(desc => {
        if (req.isAuthenticated()) {
            res.render(path.resolve(`${templateDir}${path.sep}user.ejs`), {
            bot: client,
            auth: true,
            user: req.user,
            usuário: usuário,
            moment: moment,
            badge: b,
            premium: p,
            reps: r,
            cB: coins,
            bg: bg,
            back: back,
            desc: desc
           });
        } else {
         res.render(path.resolve(`${templateDir}${path.sep}user.ejs`), {
           bot: client,
           auth: false,
           user: null,
           usuário: usuário,
           moment: moment,
           badge: b,
           premium: p,
           reps: r,
           cB: coins,
           bg: bg,
           back: back,
           desc: desc
          });
        };
       });
      });
     });
    });
   });
  });
 });
  
});

app.get('/user', (req, res) => {
  res.redirect('/')
});

app.get('/user/', (req, res) => {
  res.redirect('/')
});


  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };

 app.get("/autherror", (req, res) => {
    res.render(path.resolve(`${templateDir}${path.sep}autherror.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
    });
  });

	app.get('/legal', function (req, res) {
    var showdown	= require('showdown');
		var	converter = new showdown.Converter(),
			textPr			= privacyMD,
			htmlPr			= converter.makeHtml(textPr),
			textTe			= termsMD,
			htmlTe			= converter.makeHtml(textTe);
		res.render(path.resolve(`${templateDir}${path.sep}legal.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
			privacy: htmlPr.replace(/\\'/g, `'`),
			terms: htmlTe.replace(/\\'/g, `'`),
			edited: client.config.dashboard.legalTemplates.lastEdited
		})
  });

  app.get('/servers', (req, res) => {
		res.render(path.resolve(`${templateDir}${path.sep}servers.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
		 });
		});

  app.get('/servers/:guildID', (req, res) => {
   const moment = require('moment');
   let serverList;
   const guild = client.guilds.get(req.params.guildID);
   db.fetch(`guildSettings_${guild.id}_serverList`).then(serverList => {
   db.fetch(`guildItens_${guild.id}_premium`).then(premium => {
   db.fetch(`guildSettings_${guild.id}_invite`).then(invite => {
    res.render(path.resolve(`${templateDir}${path.sep}guild.ejs`), {
      bot: client,
      auth: req.isAuthenticated() ? true : false,
      user: req.isAuthenticated() ? req.user : null,
      guild: guild,
      moment: moment,
      serverList: serverList,
      premium: premium,
      invite: invite
     });
     });
    });
   });
  });

  app.get('/support', (req, res) => {
   client.channels.get('481999078604144661').createInvite().then(invite => {
    res.redirect(invite.url)
   });
  });

  app.get('/servers/:guildID/extra', (req, res) => {
   const guild = client.guilds.get(req.params.guildID)
  guild.fetchBans().then(bans => {
   guild.fetchInvites().then(invites => {
    res.render(path.resolve(`${templateDir}${path.sep}guild-extra.ejs`), {
      bot: client,
      auth: req.isAuthenticated() ? true : false,
      user: req.isAuthenticated() ? req.user : null,
      guild: guild,
      bans: bans,
      invites: invites
     });
    });
   });
  }); 

	app.get('/login', (req, res, next) => {
		if (req.session.backURL) {
			req.session.backURL = req.session.backURL;
		} else if (req.headers.referer) {
			const parsed = url.parse(req.headers.referer);
			if (parsed.hostname === app.locals.domain) {
				req.session.backURL = parsed.path;
			}
		} else {
			req.session.backURL = '/dashboard';
		}
		next();
	},
	passport.authenticate('discord'));

  
	app.get('/callback', passport.authenticate('discord', {
		failureRedirect: '/autherror'
	}), (req, res) => {
		if (req.session.backURL) {
			res.redirect(req.session.backURL);
			req.session.backURL = null;
		} else {
			res.redirect('/');
		}
	});

	app.get('/admin', checkAdmin, (req, res) => {
		res.render(path.resolve(`${templateDir}${path.sep}admin.ejs`), {
			bot: client,
			user: req.user,
			auth: true
		});
	});

		app.get('/dashboard', checkAuth, (req, res) => {
		const perms = Discord.EvaluatedPermissions;
    const user = req.user;
    db.fetch(`userBackground_${user.id}`).then(back => {
     db.fetch(`userItems_${user.id}_background1`).then(bg => {
      db.fetch(`userBalance2.0_${user.id}`).then(cB => {
      const coins = cF.format(cB, { code: 'BRL' })
       db.fetch(`userRep1_${user.id}`).then(r => {
        db.fetch(`userItems_${user.id}_premium1`).then(p => {
        db.fetch(`userItems_${user.id}_badge1`).then(b => {
		res.render(path.resolve(`${templateDir}${path.sep}dashboard.ejs`), {
			perms: perms,
			bot: client,
			user: user,
			auth: true,
      ms: ms,
      db: db,
      badge: b,
      premium: p,
      reps: r,
      cB: coins,
      bg: bg,
      back: back,
      moment: moment
		});
        });
        });
       });
      });
     });
    });
	});

	app.get('/add/:guildID', checkAuth, (req, res) => {
		req.session.backURL = '/dashboard';
		var invitePerm = client.config.dashboard.invitePerm;
		var inviteURL = `https://discordapp.com/oauth2/authorize?client_id=${client.appInfo.id}&scope=bot&guild_id=${req.params.guildID}&response_type=code&redirect_uri=${encodeURIComponent(`${client.callbackURL}`)}&permissions=${invitePerm}`;
		if (client.guilds.has(req.params.guildID)) {
			res.send('<p>Ryouji já está neste servidor <script>setTimeout(function () { window.location="/dashboard"; }, 1000);</script><noscript><meta http-equiv="refresh" content="1; url=/dashboard" /></noscript>');
		} else {
			res.redirect(inviteURL);
		}
	});

	app.get('/commands', (req, res) => {
		if (req.isAuthenticated()) {
			res.render(path.resolve(`${templateDir}${path.sep}commands.ejs`), {
				bot: client,
				auth: true,
				user: req.user,
				md: md
			});
		} else {
			res.render(path.resolve(`${templateDir}${path.sep}commands.ejs`), {
				bot: client,
				auth: false,
				user: null,
				md: md
			});
		}
	});

  app.get('/invite/:guildID', (req, res) => {
    db.fetch(`guildSettings_${req.params.guildID}_invite`).then(inv => {
     res.render(path.resolve(`${templateDir}${path.sep}guild-invite.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
      guild: client.guilds.get(req.params.guildID),
      inv: inv
     });
    });
  });

	app.get('/legal', function (req, res) {

		md.setOptions({
			renderer: new md.Renderer(),
			gfm: true,
			tables: true,
			breaks: false,
			pedantic: false,
			sanitize: false,
			smartLists: true,
			smartypants: false
		});

		res.render(path.resolve(`${templateDir}${path.sep}legal.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
			privacy: md(privacyMD),
			terms: md(termsMD),
			edited: client.config.dashboard.legalTemplates.lastEdited
		});
	});

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/changelog', (req, res) => {
  
		if (req.isAuthenticated()) {
			res.render(path.resolve(`${templateDir}${path.sep}changelog.ejs`), {
			 bot: client,
			 auth: true,
			 user: req.user,
       version: client.config.version,
			});
		} else {
			res.render(path.resolve(`${templateDir}${path.sep}changelog.ejs`), {
				bot: client,
				auth: false,
				user: null,
        version: client.config.version,
			});
		}
	});

  app.get('/contributors', (req, res) => {
    res.render(path.resolve(`${templateDir}${path.sep}contributors.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
    });
  });
  
  app.get('/extras', (req, res) => {
   if (req.isAuthenticated()) {
    res.render(path.resolve(`${templateDir}${path.sep}extras.ejs`), {
    		bot: client,
				auth: true,
				user: req.user
    });
   } else {
    res.render(path.resolve(`${templateDir}${path.sep}extras.ejs`), {
				bot: client,
				auth: false,
				user: null,
			});
   } 
  });

	app.get('*', function(req, res) { // Catch-all 404
		res.send('		<link href="/public/theme-dark.css" rel="stylesheet" id="theme"> <h1 style="font-family: "Pacifico", cursive; text-transform: none;"> 404 Página não encontrado. Por favor, espere...</h1> <script>setTimeout(function () { window.location = "/"; }, 1000);</script><noscript><meta http-equiv="refresh" content="1; url=/" /></noscript>');
	});

	client.site = app.listen(client.config.dashboard.port, function() {
		client.log('log', `Painel em execução na porta ${client.config.dashboard.port}`, 'INFO');
	}).on('error', (err) => {
		client.log('ERROR', `Erro ao iniciar o painel: ${err.code}`);
		return process.exit(0);
	});
};