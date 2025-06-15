
import { xpRange} from '../lib/levelling.js'

const clockString = ms => {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor(ms / 60000) % 60
  const s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

const imagen = "https://d.uguu.se/RuUuoGPE.jpg";

const menuHeader = `
╭━━━「 🌸 THE - MIKU BOT MENU 」━━━╮
┃ ¡Hola, %name!
┃ Nivel: %level | XP: %exp/%max
┃ Límite: %limit | Modo: %mode
┃ Uptime: %uptime | Usuarios: %total
╰━━━━━━━━━━━━━━━━━━━━━━━╯
`;

const sectionDivider = `╰───────────────╯`;

const menuFooter = `
╭────────────┈
│ 💡 Usa cada comando con su prefijo.
│ ✨ El bot perfecto para animarte.
│ 🛠 Desarrollado por @Miku-Team
╰────────────┈
`;

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    const user = global.db.data.users[m.sender] || { level: 1, exp: 0, limit: 5};
    const { exp, level, limit} = user;
    const { min, xp} = xpRange(level, global.multiplier || 1);
    const totalreg = Object.keys(global.db?.data?.users || {}).length;
    const mode = global.opts?.self? 'Privado 🔒': 'Público 🌐';
    const uptime = clockString(process.uptime() * 1000);
    const name = await conn.getName(m.sender) || "Usuario";

    if (!global.plugins) return conn.reply(m.chat, '❌ Plugins no cargados.', m);

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
      "🎉 Diversión": [],
      "🔞 NSFW": [],
      "📀 Base de Datos": [],
      "🔊 Audios": [],
      "🗝️ Avanzado": [],
      "🔥 Free Fire": [],
      "Otros": []
};

    Object.values(global.plugins)
.filter(p => p?.help &&!p.disabled)
.forEach(p => {
        let tag = Object.keys(categorizedCommands).find(key => p.tags?.includes(key.replace(/[^a-z]/gi, '').toLowerCase())) || 'Otros';
        categorizedCommands[tag].push(...(Array.isArray(p.help)? p.help: [p.help]));
});

    const menuBody = Object.entries(categorizedCommands)
.filter(([_, cmds]) => cmds.length> 0)
.map(([title, cmds]) => {
        const entries = cmds.map(cmd => {
          const plugin = Object.values(global.plugins).find(p => p.help?.includes(cmd));
          const premium = plugin?.premium? '💎': '';
          const limited = plugin?.limit? '🌀': '';
          return `│ 🔹 ${_p}${cmd} ${premium}${limited}`.trim();
}).join('\n');
        return `╭─「 ${title} 」\n${entries}\n${sectionDivider}`;
}).join('\n\n');

    const finalHeader = menuHeader
.replace('%name', name)
.replace('%level', level)
.replace('%exp', exp - min)
.replace('%max', xp)
.replace('%limit', limit)
.replace('%mode', mode)
.replace('%uptime', uptime)
.replace('%total', totalreg);

    const fullMenu = `${finalHeader}\n\n${menuBody}\n\n${menuFooter}`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: imagen},
      caption: fullMenu,
      mentions: [m.sender]
}, { quoted: m});

} catch (e) {
    console.error(e);
    conn.reply(m.chat, '⚠️ Error al generar el menú.', m);
}
};

handler.command = ['menu', 'help', 'menú'];
export default handler;