import fetch from "node-fetch";

const handler = async (m, { conn, text, args }) => {
  try {
    if (!args[0]) {
      return conn.reply(m.chat, `🌸 ¡Hola! Para descargar un video de TikTok, por favor envía el enlace. Ejemplo:\n\n*!tiktok* https://vm.tiktok.com/ZM81b3wQJ/`, m);
    }

    if (!/(?:https?:\/\/)?(?:www\.|vm\.|vt\.|t)?\.?tiktok\.com\/[^\s&]+/i.test(text)) {
      return conn.reply(m.chat, `❌ Ups, el enlace de TikTok que me diste no es válido. ¡Intenta con otro!`, m);
    }

    m.react('⏳');

    let res = await fetch(`https://api.sylphy.xyz/download/tiktok?url=${args[0]}&apikey=sylphy`);
    let json = await res.json();

    if (!json.status) {
      throw new Error('Lo siento, no pude obtener el contenido de TikTok. ¡Quizás el enlace no está disponible!');
    }

    let { title, duration, author } = json.data;
    let dl = json.dl;
    let type = json.type;

    let caption = `
✨ *¡TikTok Descargado con Éxito!* ✨

┌  ◦  👤 *Autor:* ${author || 'Desconocido'}
│  ◦  📌 *Título:* ${title || 'Sin título'}
└  ◦  ⏱️ *Duración:* ${duration ? `${duration} segundos` : 'Desconocida'}
`;

    if (type === 'video') {
      await conn.sendFile(m.chat, dl.url, 'tiktok.mp4', caption, m);
    } else if (type === 'image') {
      if (Array.isArray(dl.url)) {
        for (let i = 0; i < dl.url.length; i++) {
          await conn.sendFile(m.chat, dl.url[i], `tiktok_image_${i + 1}.jpg`, i === 0 ? caption : '', m);
        }
      } else {
        await conn.sendFile(m.chat, dl.url, 'tiktok_image.jpg', caption, m);
      }
    } else {
      throw new Error('¡Ups! Este tipo de contenido de TikTok aún no es compatible.');
    }

    m.react('✅');
  } catch (e) {
    console.error(e);

    return conn.reply(m.chat,`💔 ¡Oh no! Ha ocurrido un error al procesar tu solicitud: ${e.message}\n\nPor favor, inténtalo de nuevo más tarde o verifica el enlace.`, m);
  }
};

handler.help = ["tiktok"];
handler.tags = ["descargas"];
handler.command = ["tt", "tiktok", "ttdl"];
export default handler;
