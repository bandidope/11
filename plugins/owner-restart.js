import { spawn } from 'child_process'

var handler = async (m, { conn, isROwner, text }) => {

if (!process.send) throw 'Dont: node mini.js\nDo: node index.js'
if (conn.user.jid == conn.user.jid) {
await conn.reply(m.chat, '𝐒𝐞𝐫𝐯𝐢𝐝𝐨𝐫 𝐑𝐞𝐢𝐧𝐢𝐜𝐢𝐚𝐝𝐨 𝐂𝐨𝐧 𝐄𝐱𝐢𝐭𝐨✅\n𝐕𝐮𝐞𝐥𝐯𝐞 𝐀 𝐔𝐬𝐚𝐫𝐥𝐨 𝐃𝐞𝐧𝐭𝐫𝐨 𝐃𝐞 𝟏𝟓𝐬 🔥\n𝐄𝐚𝐳𝐳𝐲 𝐗 💨', m, rcanal, )
process.send('reset')
} else throw 'eh'

}
handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['restart','reiniciar'] 

handler.rowner = false

export default handler
