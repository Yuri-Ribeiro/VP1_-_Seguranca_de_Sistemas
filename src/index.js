const { KEY, SECRET } = require('./constantes');
const { receber, enviar } = require('./core');

const enviado = enviar("texto de exemplo", SECRET, KEY);
const recebido = receber(enviado, SECRET, KEY);

console.log(recebido);
