import { sticker} from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png} from '../lib/webp2mp4.js';

const emojiSticker = '🎨';
const emojiError = '❌';
const emojiLoading = '⌛';

let handler = async (m, { conn, args}) => {
  let stiker = false;

  try {
    let q = m.quoted? m.quoted: m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds> 15) {
        return m.reply(`*${emojiError} ¡El video no puede durar más de 15 segundos!*`);
}

      let img = await q.download?.();
      if (!img) {
        return conn.reply(m.chat, `🌟 *Por favor, envía una imagen o video para hacer un sticker.*\n📢 _Sigue nuestro canal para más contenido creativo._`, m);
}

      let out;
      try {
        let userId = m.sender;
        let packstickers = global.db.data.users[userId] || {};
        let texto1 = packstickers.text1 || global.packsticker;
        let texto2 = packstickers.text2 || global.packsticker2;

        stiker = await sticker(img, false, `✨ ${texto1}`, `🌈 ${texto2}`);
} finally {
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img);
          else if (/image/g.test(mime)) out = await uploadImage(img);
          else if (/video/g.test(mime)) out = await uploadFile(img);
          if (typeof out!== 'string') out = await uploadImage(img);
          stiker = await sticker(false, out, `✨ ${global.packsticker}`, `🌈 ${global.packsticker2}`);
}
}
} else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], `✨ ${global.packsticker}`, `🌈 ${global.packsticker2}`);
} else {
        return m.reply(`*⚠️ URL incorrecto, verifica que sea una imagen válida.*`);
}
}
} finally {
    if (stiker) {
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
} else {
      return conn.reply(m.chat, `📍 *Envía una foto o video para convertirla en sticker. Sigue el canal para más contenido.* 🎭`, m);
}
}
};

handler.help = ['stiker <img>', 'sticker <url>'];
handler.tags = ['sticker'];
handler.command = ['s', 'sticker', 'stiker'];

export default handler;