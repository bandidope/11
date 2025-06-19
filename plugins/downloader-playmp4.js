
import fetch from 'node-fetch';

const handler = async (m, { conn, text}) => {
  if (!text) {
    return m.reply(`
╔══❀🌸 𝗙𝗔𝗟𝗧𝗔 𝗟𝗔 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 🌸❀══╗
║ 📝 Ingresa el nombre o link del video.
║ 📌 Ejemplo:.play2 Sakura Card Captor
╚════════════════════════════╝`.trim());
}

  const sender = m.sender.split('@')[0];

  try {
    await conn.sendMessage(m.chat, {
      text: '🌸 *Buscando y procesando tu video...* 🎥',
      mentions: [m.sender]
}, { quoted: m});

    const res = await fetch(`https://fastrestapis.fasturl.cloud/downup/ytdown-v1?name=${encodeURIComponent(text)}&format=mp4&quality=720&server=auto`);
    const json = await res.json();

    if (!json?.result?.media) {
      throw new Error('❌ No se encontró el contenido.');
}

    const { thumbnail, description, lengthSeconds} = json.result.metadata;
    const { media, title, quality} = json.result;

    const caption = `
╔═🎥 *𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗔𝗗𝗔* 🌸
║ 📌 *Título:* ${title}
║ ⏱️ *Duración:* ${lengthSeconds} seg
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
      video: { url: media},
      mimetype: 'video/mp4',
      fileName: `${title}.mp4`,
      caption: `✅ *Aquí tienes tu video, @${sender}* 🎬🌸`,
      mentions: [m.sender]
}, { quoted: m});

} catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, {
      text: '⚠️ *El video es muy pesado o hubo un error.*\n🌸 Intenta más tarde o usa otro título.',
      mentions: [m.sender]
}, { quoted: m});
}
};

handler.help = ['play2 <consulta>'];
handler.tags = ['downloader'];
handler.command = ['play2'];

export default handler;