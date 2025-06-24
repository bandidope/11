export async function before(m, { conn, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  const senderJID = m.sender;
  const numericID = senderJID.split('@')[0]; // e.g., "212612345678"

  // Lista de prefijos telefónicos de países árabes (puedes añadir más)
  const arabicCountryCodes = [
    /^212/, 
     ];

    const isArabicNumber = arabicCountryCodes.some(prefix => prefix.test(numericID));

  
  if (isArabicNumber && !isOwner && !isROwner) {
    await conn.updateBlockStatus(senderJID, 'block');
    console.log(`🛑 Usuario ${senderJID} (posiblemente árabe) bloqueado por privado.`);
    return true;
  }

  return false;
}
