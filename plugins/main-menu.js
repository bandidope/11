
import { xpRange} from '../lib/levelling.js'

const clockString = ms => {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor(ms / 60000) % 60
  const s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

const imagen = "https://d.uguu.se/RuUuoGPE.jpg";

const menuHeader = `
╔═══════════════════╗
║   🤖 *The - Miku Bot Menu* 🤖
╚═══════════════════╝
`;

const menuFooter = `
━━━━━━━━━━━━━━━━━━━━━
💡 Usa los comandos con el prefijo correspondiente.
🛠️ Desarrollado por: @Miku-Team
`;

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    const user = global.db.data.users[m.sender] || { level: 1, exp: 0, limit: 5};
    const { exp, level, limit} = user;
    const { min, xp} = xpRange(level, global.multiplier || 1);
    const totalreg = Object.keys(global.db?.data?.users || {}).length;
    const mode = global.opts?.self? 'Privado 🔒': 'Público 🌐';
    const muptime = clockString(process.uptime() * 1000);
    const name = await conn.getName(m.sender) || "Usuario Desconocido";

    if (!global.plugins) {
      return conn.reply(m.chat, '❌ Error: No se han cargado los plugins correctamente.', m);
}

    let categorizedCommands = {
      "🎭 Anime": [],
      "ℹ️ Info": [],
      "🔎 Search": [],
      "🎮 Game": [],
      "🤖 SubBots": [],
      "🌀 RPG": [],
      "📝 Registro": [],
      "🎨 Sticker": [],
      "🖼️ Imagen": [],
      "🖌️ Logo": [],
      "⚙️ Configuración": [],
      "💎 Premium": [],
      "📥 Descargas": [],
      "🛠️ Herramientas": [],
      "🎭 Diversión": [],
      "🔞 NSFW": [],
      "📀 Base de Datos": [],
      "🔊 Audios": [],
      "🗝️ Avanzado": [],
      "🔥 Free Fire": [],
      "Otros": [] // Para comandos sin categoría específica
};

    Object.values(global.plugins)
.filter(p => p?.help &&!p.disabled)
.forEach(p => {
        let category = Object.keys(categorizedCommands).find(tag => p.tags?.includes(tag.replace(/[^a-zA-Z]/g, "").toLowerCase())) || "Otros";
        categorizedCommands[category].push(...(Array.isArray(p.help)? p.help: [p.help]));
});

    let commandsText = Object.entries(categorizedCommands)
.filter(([_, cmds]) => cmds.length> 0)
.map(([category, cmds]) => `📂 *${category}*\n${cmds.map(cmd => `🔸 ${_p}${cmd}`).join('\n')}`)
.join('\n\n');

    const infoBlock = `
👤 Usuario: ${name}
🎖 Nivel: ${level}
⚡ XP: ${exp - min} / ${xp}
🔓 Límite: ${limit}
🌎 Modo: ${mode}
⏱ Uptime: ${muptime}
👥 Usuarios totales: ${totalreg}
━━━━━━━━━━━━━━━━━━━━━
`;

    const menu = `${menuHeader}${infoBlock}\n${commandsText}\n${menuFooter}`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: imagen},
      caption: menu,
      mentions: [m.sender]
}, { quoted: m});

} catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Error al generar el menú. Inténtalo nuevamente.', m);
}
};

handler.command = ['menu', 'help', 'menú'];
export default handler;