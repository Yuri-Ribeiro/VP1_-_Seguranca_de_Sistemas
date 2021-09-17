const { hashSync, compareSync } = require('bcrypt');
const { createCipher, createDecipher } = require('crypto');

function encryptMessage(key, message) {
  const cipherInstance = createCipher('aes256', key);
  const encryptedMessage = `${cipherInstance.update(message, "utf8", "hex")}${cipherInstance.final("hex")}`;
  
  return encryptedMessage;
}

function decryptMessage(key, encryptedMessage) {
  const decipher = createDecipher('aes256', key);
  const decryptedMessage = `${decipher.update(encryptedMessage, "hex", "utf8")}${decipher.final("utf8")}`;
  
  return decryptedMessage;
}

function enviar(message, secret, key) {
  const hashedMessage = hashSync(`${message}${secret}`, 8);
  const newMessage = JSON.stringify({ message, hashedMessage });
  const encryptedMessage = encryptMessage(key, newMessage);

  return encryptedMessage;
}

function receber(encryptedMessage, secret, key) {
  const decryptedMessage = decryptMessage(key, encryptedMessage);
  const { message, hashedMessage } = JSON.parse(decryptedMessage);

  const success = compareSync(`${message}${secret}`, hashedMessage);
  if (!success) throw new Error("MENSAGEM NÃO CONFERE!");

  return message;
}

module.exports = { enviar, receber }