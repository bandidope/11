
import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) { 
    let numcreador = '595976126756';
    let ownerJid = numcreador + '@s.whatsapp.net';

    let name = await conn.getName(ownerJid) || 'Owner'; 
    let about = (await conn.fetchStatus(ownerJid).catch(() => {}))?.status || 'Creador de bots de WhatsApp y del The Miku Bot';
    let empresa = 'Adrian- Servicios Tecnológicos';
    let imagen = 'https://qu.ax/VGCPX.jpg'; // Reemplaza con la URL de la imagen que deseas mostrar

    // Enviar imagen junto con el número del dueño y sus detalles
    await conn.sendMessage(m.chat, { 
        image: { url: imagen },
        caption: `👤 *Dueño del bot*\n📌 *Nombre:* ${name}\n📞 *Número:* wa.me/${numcreador}\n📝 *Descripción:* ${about}\n🏢 *Empresa:* ${empresa}\n📧 *Email:* s\n🌐 *Instagram:* `,
    }, { quoted: m });
}

handler.help = ['owner']; 
handler.tags = ['main']; 
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
