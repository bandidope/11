
let handler = async (m, { conn, text}) => {
  let groupId = text? text: m.chat;
  let chat = global.db.data.chats[m.chat];

  try {
    const mensaje = `
🌸 *Miku Bot ha sido desconectada del grupo* 🌸

👋 Ha sido un placer estar aquí.
`;

    await conn.sendMessage(groupId, { text: mensaje});
    await conn.groupLeave(groupId);
    chat.welcome = true; // Restablecer configuración por si reingresa
} catch (e) {
    console.error('Error al salir del grupo:', e);
    await m.reply('⚠️ Algo salió mal al intentar abandonar el grupo.');
}
};

handler.command = /^(salir|leave|salirdelgrupo|leavegc)$/i;
handler.group = true;
handler.rowner = true;
export default handler;