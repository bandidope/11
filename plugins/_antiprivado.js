
export async function before(m, { conn, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  const senderJID = m.sender;
  const numericID = senderJID.split('@')[0]; // e.g., "212612345678"
  const countryCodeMatch = numericID.match(/^212/); // Detectar código +212 Marruecos

  // Solo bloquea si es un número de Marruecos, no es el owner y no es grupo
  if (countryCodeMatch &&!isOwner &&!isROwner) {
    await conn.updateBlockStatus(senderJID, 'block');
    console.log(`🛑 Usuario ${senderJID} de Marruecos bloqueado por privado.`);
    return true;
}

  return false;
}