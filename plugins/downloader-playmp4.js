
import fetch from 'node-fetch';

const handler = async (m, { conn, text}) => {
  if (!text) {
    return m.reply(`
╔═══❀🌸 *ERROR: Falta información* 🌸❀═══╗
║ 📌 Por favor, proporciona el nombre o enlace del video.
║ 💡 Ejemplo: *.play Sakura Card Captor opening*
╚════════════════════════════╝
    `.trim());
}

  const senderTag = '@' + m.sender.split('@')[0];

  try {
    await conn.sendMessage(m.chat, { text: '🔍 *Buscando y procesando tu video...* 🎥🌸'}, { quoted: m});

    const res = await fetch(`https://fastrestapis.fasturl.cloud/downup/ytdown-v1?name=${encodeURIComponent(text)}&format=mp4&quality=720&server=auto`);
    const json = await res.json();

    const result = json?.result;
    if (!result ||!result.media) throw '🚫 *No se encontró ningún video válido.*';

    const {
      thumbnail,
      description = 'Sin descripción',
      lengthSeconds = 'Desconocida',
      title = 'Título no disponible',
      quality,
      media
} = result.metadata? {...result.metadata,...result}: result;

    const caption = `
╔═══❀🌸 *VIDEO ENCONTRADO* 🌸❀═══╗
║ 🎬 *Título:* ${title}
║ ⏱️ *Duración:* ${duration}
╚════════════════════════════╝

📄 *Descripción:*
${description}

⬇️ Enviando tu video...`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail},
      caption,
      mentions: [m.sender]
}, { quoted: m});

    await conn.sendMessage(m.chat, {
      video: { url: media},
      fileName: `${title}.mp4`,
      mimetype: 'video/mp4',
      caption: `✅ *Aquí tienes tu video, ${senderTag} 🎬* 🌸`,
      mentions: [m.sender]
}, { quoted: m});

} catch (error) {
    console.error(error);
    await conn.sendMessage(m.chat, {
      text: `
🚫 *Error al procesar tu video.*
💡 Intenta con otro título o verifica que el enlace sea válido.
🌸 Gracias por tu paciencia.`,
      mentions: [m.sender]
}, { quoted: m});
}
};

handler.help = ['play2 <nombre o link>'];
handler.tags = ['downloader'];
handler.command = ['play2', 'ytdown', 'ytvideo'];

export default handler;