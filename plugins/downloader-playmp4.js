
import fetch from 'node-fetch';

let handler = async (m, { conn, args, text}) => {
  if (!text) throw m.reply('🌸 Por favor, proporciona una consulta.');

  const sender = m.sender.split('@')[0];

  try {
    m.reply('🔄🌸 *Procesando tu solicitud...*');

    const res = await fetch(`https://fastrestapis.fasturl.cloud/downup/ytdown-v1?name=${encodeURIComponent(text)}&format=mp4&quality=720&server=auto`);
    const json = await res.json();

    if (!json?.result?.media) {
      throw new Error('❌🌸 No se encontró el contenido.');
}

    const { thumbnail, description, lengthSeconds} = json.result.metadata;
    const { media, title, quality} = json.result;

    const caption = `🎥🌸 *DESCARGA EXITOSA*\n\n📌🌸 *Título:* ${title}\n⏳🌸 *Duración:* ${lengthSeconds} segundos\n🌟🌸 *Calidad:* ${quality}\n\n📄🌸 *Descripción:*\n${description}`;

    // Enviar imagen con información
    await conn.sendMessage(
      m.chat,
      {
        image: { url: thumbnail},
        caption: caption,
        mentions: [m.sender]
},
      { quoted: m}
);

    // Enviar el video como archivo normal
    await conn.sendMessage(
      m.chat,
      {
        video: { url: media},
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`,
        caption: `✅🌸 *Aquí tienes tu video, @${sender}* 🎬🌸`,
        mentions: [m.sender]
},
      { quoted: m}
);

} catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { text: '⚠️🌸 Intente más tarde, el vídeo es muy pesado o hubo un error al procesarlo.', mentions: [m.sender]}, { quoted: m});
}
};

handler.help = ['play'];
handler.tags = ['downloader'];
handler.command = ["play2"];

export default handler;