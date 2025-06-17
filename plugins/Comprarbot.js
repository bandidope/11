const handler = async (m, {conn}) => {
  m.reply(global.ComprarBot);
};
handler.command ='comprarbot',/^(ComprarBot|Comprar|comprar|ComprarBot)$/i;
export default handler;

global.ComprarBot = `
〔 *Miku Bot* 〕

*BOT PARA GRUPO* :
> wa.me/595976126756

*BOT PERZONALIZADO* :
> wa.me/595976126756
`;