import { WAMessageStubType} from "@whiskeysockets/baileys";
import fetch from "node-fetch";

export async function before(m, { conn, participants, groupMetadata}) {
  try {
    if (!m.messageStubType ||!m.isGroup) return;

    const imageLink = 'https://qu.ax/cqUYc.jpg';
    const user = `@${m.messageStubParameters[0].split('@')[0]}`;
    const groupName = groupMetadata.subject;
    const groupDesc = groupMetadata.desc || '🔱 Grupo sin descripción';
    const chat = global.db?.data?.chats?.[m.chat];

    if (!chat ||!chat.bienvenida) return;

    const responseMap = {
      [WAMessageStubType.GROUP_PARTICIPANT_ADD]: {
        text: `🤍 𝗘𝗮𝘇𝘇𝘆 𝗫 𝗔𝘃𝗶𝘀𝗮 🤍\n\n- 𝗡𝘂𝗲𝘃𝗼 𝗡𝗼𝗺𝗯𝗿𝗲 : ${groupName}\n- 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 : ${user}`,
        mentions: [m.messageStubParameters[0]]
},
      [WAMessageStubType.GROUP_PARTICIPANT_LEAVE]: {
        text: `🤍 𝗘𝗮𝘇𝘇𝘆 𝗫 𝗔𝘃𝗶𝘀𝗮 🤍\n\n- 𝗡𝘂𝗲𝘃𝗼 𝗡𝗼𝗺𝗯𝗿𝗲 : ${groupName}\n- 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 : ${user}!`,
        mentions: [m.messageStubParameters[0]]
},
      [WAMessageStubType.GROUP_PARTICIPANT_REMOVE]: {
        text: `🤍 𝗘𝗮𝘇𝘇𝘆 𝗫 𝗔𝘃𝗶𝘀𝗮 🤍\n\n- 𝗡𝘂𝗲𝘃𝗼 𝗡𝗼𝗺𝗯𝗿𝗲 : ${groupName}\n- 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 : ${user}`,
        mentions: [m.messageStubParameters[0]]
}
};

    const response = responseMap[m.messageStubType];
    if (response) {
      await conn.sendMessage(m.chat, {
        image: { url: imageLink},
        caption: response.text,
        mentions: response.mentions
});
}
} catch (err) {
    console.error("🔱 Error en mensaje grupal de bienvenida/despedida:", err);
}
}
