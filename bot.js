// add in discord.js v14 gubbins with the token in .env file
// create .gitignore containing '.env' so token isnt uploaded
require('dotenv').config();
const {token} = process.env
const { Client, GatewayIntentBits, Partials, channelMention } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    ],
    'partials': [Partials.Channel]
 });

// report in Terminal
client.on('ready', () => {
    console.log('Logged in!');
  });

//  !rroll n = risus roll (1,2,3,4,5,6) n times
//  !droll n = demi roll (1,2,3,0,0,0) n times
//  !rteam n = risus team (0,0,0,0,0,6) n times
//  !dteam n = demi team (0,0,3,0,0,0) n times
//  !demer n = demi emergency (1,0,0,0,0,0) n times - but will usually be 1


// prepare for spaghetti code!
// gets message from Discord
client.on('messageCreate', async (message) => {
// splits message into 2 parts using space as delimiter
// message_part[0] = first part of message
// message_part[1] = second part of message
message_part=message.content.split(' ')

// if first part '!rroll'
  if (message_part[0] === '!rroll') {
// if no valid number passed, error out
    if (isNaN(message_part[1])) {
      return message.reply(`Not a Number... `);}
    else
    {
// create a collection rollResults
    const rollResults = [];
// loop through number of times = number passed
    for (let i = 0; i < message_part[1]; i++) {
// push (adds value to the end of a collection) rnd6 to rollResult
      rollResults.push(Math.floor(Math.random()*6)+1);
      }
// add all rollResults into 'sum'
      const sum = rollResults.reduce((a,b) => a + b);
// display collection of results and bold total
      return message.reply(`[${rollResults}] **${sum}** `);
    }
   }

// if first part '!droll'
if (message_part[0] === '!droll') {
  if (isNaN(message_part[1])) {
    return message.reply(`Not a Number... `);}
  else
  {
  const rollResults = [];
  for (let i = 0; i < message_part[1]; i++) {
  var response = Math.floor(Math.random()*6)+1;
    if (response == 6)  {
        response = 0
    };
    if (response == 5)  {
      response = 0
    };
    if (response == 4)  {
      response = 0
    };
    rollResults.push(response);
  }
  const sum = rollResults.reduce((a,b) => a + b);
  return message.reply(`[${rollResults}] **${sum}** `);
  }
 }

// if first part '!rteam' we only collect 6s
  if (message_part[0] === '!rteam') {
    if (isNaN(message_part[1])) {
      return message.reply(`Not a Number... `);}
    else
    {
    const rollResults = [];
    for (let i = 0; i < message_part[1]; i++) {
    var response = Math.floor(Math.random()*6)+1;
      if (response != 6)  {
          response = 0
      };
    rollResults.push(response);
    }
    const sum = rollResults.reduce((a,b) => a + b);
    return message.reply(`[${rollResults}] **${sum}** `);
    }
   }

   // if first part '!dteam' we only collect 3s
   if (message_part[0] === '!dteam') {
    if (isNaN(message_part[1])) {
      return message.reply(`Not a Number... `);}
    else
    {
    const rollResults = [];
    for (let i = 0; i < message_part[1]; i++) {
    var response = Math.floor(Math.random()*6)+1;
      if (response != 3)  {
         response = 0
      };
    rollResults.push(response);
    }
  const sum = rollResults.reduce((a,b) => a + b);
  return message.reply(`[${rollResults}] **${sum}** `);
    }
 }

   // if first part '!demer' we only collect 1s - and we 'should' only only roll 1 die 
   if (message_part[0] === '!demer') {
    if (isNaN(message_part[1])) {
      return message.reply(`Not a Number... `);}
    else
    {
    const rollResults = [];
    for (let i = 0; i < message_part[1]; i++) {
    var response = Math.floor(Math.random()*6)+1;
      if (response != 1)  {
         response = 0
      };
    rollResults.push(response);
    }
  const sum = rollResults.reduce((a,b) => a + b);
  return message.reply(`[${rollResults}] **${sum}** `);
    }
   }

  });

client.login(token)