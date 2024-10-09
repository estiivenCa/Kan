import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
let user = global.db.data.users[m.sender]
let name2 = conn.getName(m.sender)
if (user.registered === true)  return m.reply(`*『✦』Ya estás registrado, para volver a registrarte, usa el comando: #unreg*`);
if (!Reg.test(text))  return m.reply(`*『✦』El comando ingresado es incorrecto, úselo de la siguiente manera:*\n\n#reg *Nombre.edad*\n\n\`\`\`Ejemplo:\`\`\`\n#reg *${name2}.18*`);
let [_, name, splitter, age] = text.match(Reg)
if (!name)   return m.reply('*『✦』No puedes registrarte sin nombre, el nombre es obligatorio. Inténtelo de nuevo.*');
if (!age) return m.reply('*『✦』No puedes registrarte sin la edad, la edad es opcional. Inténtelo de nuevo.*');
if (name.length >= 30)  return m.reply('*『✦』El nombre no debe de tener más de 30 caracteres.*');
age = parseInt(age)
if (age > 999)  return m.reply('*『😏』Viejo/a Sabroso/a*');
if (age < 5) return m.reply('*『🍼』Ven aquí, te adoptarè!!*');
user.name = name.trim()
user.age = age
user.regTime = + new Date
user.registered = true
global.db.data.users[m.sender].money += 600
global.db.data.users[m.sender].estrellas += 50
global.db.data.users[m.sender].exp += 245
global.db.data.users[m.sender].joincount += 5
let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)        
m.react('📩') 
let regbot = `👤 𝗥 𝗘 𝗚 𝗜 𝗦 𝗧 𝗥 𝗢 👤
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
「💭」𝗡𝗼𝗺𝗯𝗿𝗲: ${name}
「✨️」𝗘𝗱𝗮𝗱: ${age} años
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
「🎁」𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:
• 50 Estrellas 🌟
• 245 Experiencia 💸
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
${packname}`
await conn.sendMini(m.chat, '⊱『✅𝆺𝅥 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢(𝗔) 𝆹𝅥✅』⊰', textbot, regbot, imagen1, imagen1, channel, m)
//await m.reply(`${sn}`)        
}
handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler
