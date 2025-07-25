import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
let Styles = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = Object.freeze({
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  });
  var replacer = [];
  xStr.map((v, i) => replacer.push({
    original: v,
    convert: yStr[style].split('')[i]
  }));
  var str = text.toLowerCase().split('');
  var output = [];
  str.map(v => {
    const find = replacer.find(x => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};
let tags = {
  'ventas':  '🤍 ᴇᴀᴢᴢʏ x ᴠᴇɴᴛᴀꜱ 🤍',
  'freefire':  '🎮 ꜰʀᴇᴇ ꜰɪʀᴇ 🎇',
  'freefireeu':  '🤍 ꜰʀᴇᴇ ꜰɪʀᴇ ᴇᴜ 🎮',
  'main': '❗ ɪɴꜰᴏ ❕',
  'search': '🔎 ꜱᴇᴀʀᴄʜ 🔍',
  'game': '🕹️ ɢᴀᴍᴇ 🎮',
  'rpg': '🌐 ʀᴘɢ 🥇',
  'rg': '🎑 ʀᴇɢɪꜱᴛʀᴏ 🎟️',
  'sticker': '💟 ꜱᴛɪᴄᴋᴇʀ 🏷️',
  'img': '🖼️ ɪᴍᴀɢᴇɴ 🎇',
  'group': '👥 ɢʀᴜᴘᴏ 📢',
//  'logo': '_MAKER_',
  'nable': '🎛️ ᴏɴ / ᴏꜰꜰ 🔌', 
  'premium': '💎 ᴘʀᴇᴍɪᴜɴ 👑',
  'downloader': '📥 ᴅᴇꜱᴄᴀʀɢᴀꜱ 📤',
  'tools': '🔧 ᴛᴏᴏʟꜱ 🛠️',
  'fun': '🎉 ꜰᴜɴ 🎊',
  'nsfw': '🔞 ɴꜱꜰᴡ 📛', 
  'cmd': '🧮 ᴅᴀᴛᴀ ʙᴀꜱᴇ 🖥️',
  'owner': '👤 ᴏᴡɴᴇʀ 👁️', 
  'audio': '📣 ᴀᴜᴅɪᴏꜱ 🔊', 
  'advanced': '🗝️ ᴀᴅᴠᴀɴᴄᴇ 📍',
  'anime': '🧧 ᴀɴɪᴍᴇ 🎐',
}

const defaultMenu = {
  before:  `
╔══════ •『 ɪɴꜰᴏ ᴇᴀᴢᴢʏ 』
║ 🖥️ ᴄʀᴇᴀᴅᴏʀ : @kcha.mobiles
║ 👤 ᴄʟɪᴇɴᴛᴇ : %name
║ ⭐ ᴇxᴘ : %exp
║ ⚡ ɴɪᴠᴇʟ : %level
╚═════ ♢.✰.♢ ═══════

╔══════ •『 ɪɴꜰᴏ ᴜꜱᴇʀ 』
║ 🤖 ʙᴏᴛ : ©Eazzy Bot
║ 💎 ᴍᴏᴅᴏ : Privado
║ 💨 ʙᴀɪʟᴇʏꜱ : Multi Device
║ 🎩 ᴜꜱᴜᴀʀɪᴏꜱ : %totalreg 
╚═════ ♢.✰.♢ ════════
 %readmore`.trimStart(),
  header: '╔══════ •『 %category 』',
  body: '┋🤍 %cmd %islimit %isPremium\n',
  footer: '╚═════ ♢.✰.♢ ════════\n',
  after: `© ${textbot}`,
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
     let tag = `@${m.sender.split("@")[0]}`
    let mode = global.opts["self"] ? "Privado" : "Publico"
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : ``) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '◜⭐◞' : '')
                .replace(/%isPremium/g, menu.premium ? '◜🪪◞' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
   let replace = {
 "%": "%",
 p: _p,
 uptime,
 muptime,
 me: conn.getName(conn.user.jid),
 npmname: _package.name,
 npmdesc: _package.description,
 version: _package.version,
 exp: exp - min,
 maxexp: xp,
 totalexp: exp,
 xp4levelup: max - exp,
 github: _package.homepage ? _package.homepage.url || _package.homepage : "[unknown github url]",
 mode,
 _p,
 tag,
 name,
 level,
 limit,
 name,
 totalreg,
 readmore: readMore
   }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    let pp = 'https://qu.ax/cqUYc.jpg'
    let pp2 = 'https://qu.ax/cqUYc.jpg'
    let pp3 = 'https://qu.ax/cqUYc.jpg'
    let pp4 = 'https://qu.ax/cqUYc.jpg'
    let pp5 = 'https://qu.ax/cqUYc.jpg'
    let pp6 = 'https://qu.ax/cqUYc.jpg'
    let pp7 = 'https://qu.ax/cqUYc.jpg'
    let pp8 = 'https://qu.ax/cqUYc.jpg'
    let pp9 = 'https://qu.ax/cqUYc.jpg'
    let pp10 = 'https://qu.ax/cqUYc.jpg'
    let pp11 = 'https://qu.ax/cqUYc.jpg'
    let pp12 = 'https://qu.ax/cqUYc.jpg'
    let pp13 = 'https://qu.ax/cqUYc.jpg'
    let pp14 = 'https://qu.ax/cqUYc.jpg'
    let pp15 = 'https://qu.ax/cqUYc.jpg'
    let img = 'https://qu.ax/cqUYc.jpg'
    let img2 = 'https://qu.ax/cqUYc.jpg'
   // await conn.sendMessage(m.chat, { video: { url: [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15].getRandom() }, gifPlayback: true, caption: text.trim(), mentions: [m.sender] }, { quoted: estilo })
    await conn.sendFile(m.chat, img, 'thumbnail.jpg', text.trim(), m, null, rcanal)
   //await conn.sendAi(m.chat, botname, textbot, text.trim(), img, img, canal, estilo)

  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.help = ['allmenu']
handler.tags = ['main']
handler.command = ['allmenu', 'menucompleto', 'menúcompleto', 'menú', 'menu'] 
handler.register = false 
export default handler


const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

  var ase = new Date();
  var hour = ase.getHours();
switch(hour){
  case 0: hour = 'una linda noche 🌙'; break;
  case 1: hour = 'una linda noche 💤'; break;
  case 2: hour = 'una linda noche 🦉'; break;
  case 3: hour = 'una linda mañana ✨'; break;
  case 4: hour = 'una linda mañana 💫'; break;
  case 5: hour = 'una linda mañana 🌅'; break;
  case 6: hour = 'una linda mañana 🌄'; break;
  case 7: hour = 'una linda mañana 🌅'; break;
  case 8: hour = 'una linda mañana 💫'; break;
  case 9: hour = 'una linda mañana ✨'; break;
  case 10: hour = 'un lindo dia 🌞'; break;
  case 11: hour = 'un lindo dia 🌨'; break;
  case 12: hour = 'un lindo dia ❄'; break;
  case 13: hour = 'un lindo dia 🌤'; break;
  case 14: hour = 'una linda tarde 🌇'; break;
  case 15: hour = 'una linda tarde 🥀'; break;
  case 16: hour = 'una linda tarde 🌹'; break;
  case 17: hour = 'una linda tarde 🌆'; break;
  case 18: hour = 'una linda noche 🌙'; break;
  case 19: hour = 'una linda noche 🌃'; break;
  case 20: hour = 'una linda noche 🌌'; break;
  case 21: hour = 'una linda noche 🌃'; break;
  case 22: hour = 'una linda noche 🌙'; break;
  case 23: hour = 'una linda noche 🌃'; break;
}
  var greeting = "espero que tengas " + hour;
