const handler = async (m, { conn, args }) => {
    // Verificar si se proporcionaron los argumentos necesarios

    // Validar el formato de la hora
    const horaRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    if (!horaRegex.test(args[0])) {
        conn.reply(m.chat, '_Formato de hora incorrecto. Debe ser HH:MM en formato de 24 horas._', m);
        return;
    }

    const horaUsuario = args[0]; // Hora proporcionada por el usuario

    // Calcular la hora adelantada
    const horaUsuarioSplit = horaUsuario.split(':');
    let horaAdelantada = '';
    if (horaUsuarioSplit.length === 2) {
        const horaNumerica = parseInt(horaUsuarioSplit[0], 10);
        const minutoNumerico = parseInt(horaUsuarioSplit[1], 10);
        const horaAdelantadaNumerica = horaNumerica + 1; // Adelantar 1 hora
        horaAdelantada = `${horaAdelantadaNumerica.toString().padStart(2, '0')}:${minutoNumerico.toString().padStart(2, '0')}`;
    }

    const message = `
*12 𝐕𝐄𝐑𝐒𝐔𝐒 12*

⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎                  •
🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : 
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 : 

➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: 
➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:

         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
    
    👑 ┇ 
    🥷🏻 ┇  
    🥷🏻 ┇ 
    🥷🏻 ┇ 
          
         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 2
    
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 

         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 3
    
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 


      ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:
    🥷🏻 ┇ 
    🥷🏻 ┇
                 
    `.trim();

    conn.sendMessage(m.chat, {text: message}, {quoted: m});
};
handler.help = ['12vs12']
handler.tags = ['freefireeu']
handler.command = /^(12vs12)$/i;
handler.botAdmin = false;
handler.admin = true;
handler.group = true;

export default handler