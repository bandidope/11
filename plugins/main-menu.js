
import { xpRange} from '../lib/levelling.js'

const generateMenu = (name, level, exp, maxexp, totalreg, mode, muptime, _p, help) => {
  let title = `💠 *MENÚ PRINCIPAL* 💠\n📌 Usuario: ${name}\n📊 Nivel: ${level}\n⚡ EXP: ${exp} / ${maxexp}\n👥 Usuarios Registrados: ${totalreg}\n🔰 Modo: ${mode}\n⏳ Tiempo activo: ${muptime}\n\n📜 *LISTA DE COMANDOS DISPONIBLES:* 📜\n`

  let commands = help
.map(menu => `🛠 *${menu.tags[0].toUpperCase()}*\n` + menu.help.map(cmd => `🔹 ${_p + cmd}`).join('\n'))
.join('\n\n')

  return `${title}\n${commands}\n\n🚀 Usa los comandos para interactuar con el bot.`
}

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    let name = await conn.getName(m.sender)
    let { exp, level} = global.db.data.users[m.sender]
    let { min, xp} = xpRange(level, global.multiplier)
    let totalreg = Object.keys(global.db.data.users).length
    let mode = global.opts["self"]? "Privado": "Público"
    let muptime = clockString(process.uptime() * 1000)

    let help = Object.values(global.plugins).filter(p =>!p.disabled).map(p => ({
      help: Array.isArray(p.help)? p.help: [p.help],
      tags: Array.isArray(p.tags)? p.tags: [p.tags],
}))

    let menuText = generateMenu(name, level, exp - min, xp, totalreg, mode, muptime, _p, help)

    await conn.sendMessage(m.chat, { text: menuText, mentions: [m.sender]}, { quoted: m})
} catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ Hubo un error al generar el menú.', m)
}
}

handler.command = ['menu', 'help']
export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}