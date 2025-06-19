
import fetch from 'node-fetch';

const handler = async (m, { conn, text}) => {
  if (!text) {
    return m.reply(`
╭─❀🌸 *FALTA EL NOMBRE* 🌸❀─╮
│ Escribe el título o link del video.
│
│ 💡 Ejemplo:
│.play2 Your Name trailer
╰──────────────────────────╯`.trim());
}

  try {
    await m.reply('🔎 Buscando tu video... 🌸');

    const res = await fetch(`https://fastrestapis.fasturl.cloud/downup/ytdown-v1?name=${encodeURIComponent(text)}&format=mp4&quality=720&server=auto`);
    const json = await res.json();

    const data = json?.result;
    const meta = data?.metadata || {};

    if (!data?.media) {
      const motivo = json?.message || 'No se encontró media válida.';
      return m.reply(`❌ *No se pudo obtener el video.*\n🌸 Motivo: ${motivo}`);
}

    const title = data.title || 'Título no disponible';
    const duration = meta.lengthSeconds || 'Desconocida';
    const quality = data.quality || 'Auto';
    const description = meta.description || 'Sin descripción';
    const thumbnail = meta.thumbnail || 'https://i.ibb.co/NyBN0kD/thumbnail.jpg';

    const caption = `
╔═🎬 *VIDEO LISTO* 🌸
║ 🎞️ *Título:* ${title}
║ ⏱️ *Duración:* ${duration} seg
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
      caption: `✅ Aquí está tu video, @${m.sender.split('@')[0]} 🎥🌸`,
      mentions: [m.sender]
}, { quoted: m});

} catch (e) {
    console.error('[❌ Error al procesar el video]', e);
    return m.reply('⚠️ Ocurrió un error inesperado al procesar el video. Intenta con otro enlace o título. 🌸');
}
};

handler.help = ['play2 <consulta>'];
handler.tags = ['downloader'];
handler.command = ['play2'];

export default handler;