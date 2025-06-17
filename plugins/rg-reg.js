
import { createHash} from 'crypto';

let handler = async (m, { conn, text, usedPrefix, command}) => {
  const formatoRegistro = /^([^\s]+)\.(\d{1,3})\.([^\s]+)$/i;
  const datos = global.db.data.users[m.sender] || {};
  const fondo = 'https://qu.ax/ARhkT.jpg';

  if (datos.registered) {
    return m.reply(`🌸 *Ya estás registrada/o.*\n\n🧼 Usa *${usedPrefix}unreg* si deseas borrarte del registro.`);
}

  if (!formatoRegistro.test(text)) {
    return m.reply(`🌷 *Formato incorrecto.*\n\n🌸 Usa: *${usedPrefix + command} Nombre.Edad.País*\n📌 Ejemplo: *${usedPrefix + command} Sakura.22.Japón*`);
}

  const [, nombre, edadStr, pais] = text.match(formatoRegistro);
  const edad = parseInt(edadStr);

  if (!nombre || nombre.length> 32) return m.reply(`❌ El nombre es demasiado largo o inválido.`);
  if (isNaN(edad) || edad < 5 || edad> 120) return m.reply(`🎂 Edad inválida, debe estar entre 5 y 120 años.`);
  if (!pais || pais.length> 40) return m.reply(`🌍 El país es muy largo o inválido.`);

  const id = createHash('md5').update(m.sender).digest('hex');

  global.db.data.users[m.sender] = {
    name: nombre,
    age: edad,
    country: pais,
    registered: true,
    regTime: Date.now(),
    id
};

  const mensajeRegistro = `🌸 *Registro completado con éxito*\n\n✨ *Nombre:* _${nombre}_\n🎂 *Edad:* _${edad} años_\n🌍 *País:* _${pais}_\n🆔 *ID:* _${id}_`;

  await conn.sendMessage(m.chat, {
    image: { url: fondo},
    caption: mensajeRegistro
});

  await conn.sendMessage(m.chat, {
    text: `✅ *Verificación completada con éxito.*\n🌷 ¡Bienvenido/a a la comunidad, ${nombre}!`,
    contextInfo: {
      externalAdReply: {
        title: '🌸 Registro Exitoso',
        body: 'Miku Bot 🌸',
        thumbnailUrl: fondo,
        sourceUrl: 'https://whatsapp.com/channel/0029Vaua0ZD3gvWjQaIpSy18',
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true
}
}
});
};

handler.help = ['🌸 registro <nombre.edad.país>'];
handler.tags = ['🌸 registro'];
handler.command = ['🌸registrar', '🌸registro', '🌸reg'];

export default handler;