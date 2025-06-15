
const clockString = ms => {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor(ms / 60000) % 60
  const s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

const menuHeader = `
╔═══════════════════╗
║   🤖 *Barboza Core Menu* 🤖
╚═══════════════════╝
`;

const menuFooter = `
━━━━━━━━━━━━━━━━━━━━━
💡 Usa los comandos con el prefijo correspondiente.
🛠️ Desarrollado por: @Barboza
`;

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    const user = global.db.data.users[m.sender] || { level: 1, exp: 0, limit: 5};
    const { exp, level, limit} = user;
    const { min, xp} = xpRange(level, global.multiplier || 1);
    const totalreg = Object.keys(global.db.data.users).length;
    const mode = global.opts.self? 'Privado 🔒': 'Público 🌐';
    const muptime = clockString(process.uptime() * 1000);
    const name = await conn.getName(m.sender);

    let categorizedCommands = {}; // Diccionario para agrupar comandos dinámicamente

    Object.values(global.plugins)
.filter(p =>!p.disabled)
.forEach(p => {
        let category = p.tags?.[0] || "Otros"; // Si no tiene categoría, va a "Otros"
        categorizedCommands[category] = categorizedCommands[category] || [];
        categorizedCommands[category].push(...(Array.isArray(p.help)? p.help: [p.help]));
});

    let commandsText = Object.entries(categorizedCommands)
.map(([category, cmds]) => `📂 *${category.toUpperCase()}*\n${cmds.map(cmd => `🔸 ${_p}${cmd}`).join('\n')}`)
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
      text: menu,
      mentions: [m.sender]
}, { quoted: m});

} catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Error al generar el menú.', m);
}
};

handler.command = ['menu', 'help', 'menú'];
export default handler;