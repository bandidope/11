
import { xpRange} from '../lib/levelling.js'

function generateMenu({ name, level, exp, maxexp, totalreg, mode, muptime, _p, help}) {
  const header = `💠 *MENÚ PRINCIPAL* 💠\n\n👤 *Usuario:* ${name}\n📈 *Nivel:* ${level}\n🔋 *EXP:* ${exp} / ${maxexp}\n🌍 *Modo:* ${mode}\n📊 *Usuarios Registrados:* ${totalreg}\n⏳ *Tiempo Activo:* ${muptime}\n\n📖 *Comandos Disponibles:*`;

  const body = help.map(plugin => {
    let section = `\n\n🔹 *${(plugin.tags[0] || 'Otros').toUpperCase()}*\n`;
    section += plugin.help.map(cmd => `   ◦ ${_p}${cmd}`).join('\n');
    return section;
}).join('');

  return `${header}${body}\n\n👉 Usa cualquier comando para interactuar con el bot.`;
}

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    const userData = global.db?.data?.users?.[m.sender] || {};
    const exp = userData.exp || 0;
    const level = userData.level || 1;
    const { min, xp} = xpRange(level, global.multiplier || 1);
    const name = (await conn.getName(m.sender)) || 'Desconocido';
    const totalreg = Object.keys(global.db?.data?.users || {}).length;
    const mode = global.opts?.self? 'Privado': 'Público';
    const muptime = clockString(process.uptime() * 1000);

    const help = Object.values(global.plugins || {}).filter(p =>!p.disabled).map(p => ({
      help: Array.isArray(p.help)? p.help: [p.help || 'sin_comando'],
      tags: Array.isArray(p.tags)? p.tags: ['otros'],
}));

    const menuText = generateMenu({
      name,
      level,
      exp: exp - min,
      maxexp: xp,
      totalreg,
      mode,
      muptime,
      _p,
      help
});

    await conn.sendMessage(m.chat, { text: menuText, mentions: [m.sender]}, { quoted: m});
} catch (err) {
    console.error(err);
    conn.reply(m.chat, '❌ Error al generar el menú. Avísame si quieres depurarlo juntos.', m);
}
};

handler.command = ['menu', 'help'];
export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
