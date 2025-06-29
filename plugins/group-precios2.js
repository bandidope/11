
// Código Hecho Por Barboza
let handler = async (m, { conn }) => {
    // React con un emoji al mensaje
    await m.react('⭐');

    // Mensaje que se enviará
    const message = `
Precios Xiters Bot 🔱

Recuerda Los Precios Estan En Moneda Peruana 🇵🇪

🔱 Mensual Xiters / Permanente Xiters 🔱

1 Grupo Bot : 3.50s / 4.50s
3 Grupos Bot : 9s / 10s
6 Grupos Bot : 18s/ 20s

🔱 Xiters Perzonalizado : 15s / 35s

🔱 Contact : +51 936 994 155

Canal Xiters : https://whatsapp.com/channel/0029Vb5oUp43LdQUVViHwc0m`;

    if (m.isGroup) {
        // URL de la imagen
        const imageUrl ='https://qu.ax/tqNbW.jfif'; // Cambia esta URL por la de la imagen que deseas enviar

        // Envía la imagen con el mensaje
        await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { mimetype: 'image/jpeg' });
    }
}

handler.help = ['preciobot'];
handler.tags = ['main'];
handler.group = true;
handler.command = ['preciobot', 'p2'];

export default handler;
