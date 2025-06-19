
import fetch from 'node-fetch';

const handler = async (m, { conn, text}) => {
  if (!text) {
    return m.reply(`
╭─❀🌸 *CONSULTA REQUERIDA* 🌸❀─╮
│ Ingresa el título o enlace del video.
│
│ 📌 Ejemplo:
│.play2 Tokyo Ghoul opening
╰────────────────────────────╯`.trim());
}

  const sender = '@' + m.sender.split('@')[0];

  try {
    await conn.sendMessage(m.chat, {
      text: '🌸 *Buscando video... Por favor espera* 🕐',
      mentions: [m.sender]
}, { quoted: m});

    const res = await fetch(`https://fastrestapis.fasturl.cloud/downup/ytdown-v1?name=${encodeURIComponent(text)}&format=mp4&quality=720&server=auto`);
    const json = await res.json();

    if (!json?.result ||!json.result.media) {
      return m.reply('❌ No se encontró el video o el enlace es inválido.');
}

    const data = json.result;
    const meta = data.metadata || {};
    const title = data.title || 'Sin título';
    const length = meta.lengthSeconds || 'Desconocido';
    const quality = data.quality || 'Automática';
    const description = meta.description || 'Sin descripción disponible';
    const thumbnail = meta.thumbnail || 'https://i.ibb.co/NyBN0kD/thumbnail.jpg';

    const caption = `
╔═🎬 *VIDEO LISTO PARA DESCARGA* 🌸
║ 📌 *Título:* ${title}
║ ⏱️ *Duración:* ${length} segundos
║ 💎 *Calidad:* ${quality}
╚════════════════════╝

📄 *Descripción:*
${description}`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail},
      caption,
      mentions: [m.sender]
}, { quoted: m});

    await conn.sendMessage(m.chat, {
      video: { url: data.media},
      mimetype: 'video/mp4',
      fileName: `${title}.mp4`,
      caption: `✅ *Aquí tienes tu video, ${sender}* 🎥🌸`,
      mentions: [m.sender]
}, { quoted: m});

} catch (e) {
    console.error('🔴 Error al procesar video:', e);
    return conn.sendMessage(m.chat, {
      text: '⚠️ No se pudo procesar el video. Intenta con otro título o revisa el enlace.',
      mentions: [m.sender]
}, { quoted: m});
}
};

handler.help = ['play2 <nombre o enlace>'];
handler.tags = ['downloader'];
handler.command = ['play2'];

export default handler;           