
import { xpRange} from '../lib/levelling.js'

const generateMenu = ({ name, level, exp, maxexp, totalreg, mode, muptime, _p, help}) => {
  let title = `💠 *MENÚ PRINCIPAL* 💠\n📌 Usuario: ${name}\n📊 Nivel: ${level}\n⚡ EXP: ${exp} / ${maxexp}\n👥 Usuarios Registrados: ${totalreg}\n🔰 Modo: ${mode}\n⏳ Tiempo activo: ${muptime}\n\n📜 *LISTA DE COMANDOS DISPONIBLES:* 📜\n`;

  let commands = help
.map(menu => menu.tags.length> 0
? `🛠 *${menu.tags[0].toUpperCase()}*\n` + menu.help.map(cmd => `🔹 ${_p + cmd}`).join('\n')
: `🔹 ${_p + menu.help[0]}`)
.join('\n\n');

  return `${title}\n${commands}\n\n🚀 Usa los comandos para interactuar con el bot.`;
}

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    let userData = global.db.data.users[m.sender] || { exp: 0, level: 1}; // Evita errores si el usuario no tiene datos aún
    let { min, xp} = xpRange(userData.level, global.multiplier || 1); // Ajusta correctamente los rangos de XP
    let totalreg = Object.keys(global.db.data.users || {}).length; // Asegura que haya registros disponibles
    let mode = global.opts?.self? "Privado": "Público";
    let muptime = clockString(process.uptime() * 1000);
    let name = await conn.getName(m.sender) || "Usuario Desconocido"; // Asegura que el nombre no sea undefined

    let help = Object.values(global.plugins || {}).filter(p =>!p.disabled).map(p => ({
      help: Array.isArray(p.help)? p.help: [p.help],
      tags: Array.isArray(p.tags)? p.tags: ["otros"],
}));

    let menuText = generateMenu({ name, level: userData.level, exp: userData.exp - min, maxexp: xp, totalreg, mode, muptime, _p, help});

    await conn.sendMessage(m.chat, { text: menuText, mentions: [m.sender]}, { quoted: m});
} catch (e) {
    console.error(e);
    conn.reply(m.chat, '❎ Hubo un error al generar el menú. Inténtalo nuevamente más tarde.', m);
}
}

handler.command = ['menu', 'help'];
export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}